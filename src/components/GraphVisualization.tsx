import React, { useEffect, useRef, useState } from 'react';
import { Search, Filter, ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Info } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'building' | 'transformer' | 'feeder' | 'sensor' | 'pv' | 'battery' | 'ev_charger';
  x: number;
  y: number;
  size: number;
  color: string;
  data: any;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: 'electrical' | 'data' | 'spatial' | 'ownership';
  weight: number;
  color: string;
}

interface GraphVisualizationProps {
  width?: number;
  height?: number;
}

export default function GraphVisualization({ width = 800, height = 600 }: GraphVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [visibleLayers, setVisibleLayers] = useState({
    buildings: true,
    grid: true,
    sensors: true,
    renewables: true,
    storage: true,
    mobility: true
  });

  // Generate sample graph data
  const generateGraphData = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Building nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        id: `building-${i}`,
        label: `Building ${i + 1}`,
        type: 'building',
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        size: 8 + Math.random() * 12,
        color: '#3b82f6',
        data: {
          type: ['Residential', 'Commercial', 'Industrial'][Math.floor(Math.random() * 3)],
          demand: Math.round(50 + Math.random() * 200),
          year: 1960 + Math.floor(Math.random() * 60),
          area: Math.round(100 + Math.random() * 500)
        }
      });
    }

    // Transformer nodes
    for (let i = 0; i < 5; i++) {
      nodes.push({
        id: `transformer-${i}`,
        label: `Transformer T-${i + 1}`,
        type: 'transformer',
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        size: 15,
        color: '#ef4444',
        data: {
          capacity: `${200 + Math.random() * 600}kVA`,
          load: Math.round(40 + Math.random() * 50),
          voltage: '11kV/400V'
        }
      });
    }

    // Sensor nodes
    for (let i = 0; i < 20; i++) {
      nodes.push({
        id: `sensor-${i}`,
        label: `Sensor S-${i + 1}`,
        type: 'sensor',
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        size: 6,
        color: '#8b5cf6',
        data: {
          type: ['Temperature', 'Power', 'Voltage', 'Current'][Math.floor(Math.random() * 4)],
          status: Math.random() > 0.1 ? 'Active' : 'Offline',
          lastReading: new Date().toISOString()
        }
      });
    }

    // PV nodes
    for (let i = 0; i < 15; i++) {
      nodes.push({
        id: `pv-${i}`,
        label: `PV System ${i + 1}`,
        type: 'pv',
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        size: 10,
        color: '#eab308',
        data: {
          capacity: `${5 + Math.random() * 20}kW`,
          generation: Math.round(Math.random() * 100),
          efficiency: Math.round(85 + Math.random() * 10)
        }
      });
    }

    // Battery nodes
    for (let i = 0; i < 8; i++) {
      nodes.push({
        id: `battery-${i}`,
        label: `Battery ${i + 1}`,
        type: 'battery',
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        size: 12,
        color: '#10b981',
        data: {
          capacity: `${50 + Math.random() * 200}kWh`,
          soc: Math.round(20 + Math.random() * 60),
          cycles: Math.round(100 + Math.random() * 500)
        }
      });
    }

    // EV Charger nodes
    for (let i = 0; i < 12; i++) {
      nodes.push({
        id: `ev-${i}`,
        label: `EV Charger ${i + 1}`,
        type: 'ev_charger',
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        size: 8,
        color: '#f97316',
        data: {
          power: `${7 + Math.random() * 43}kW`,
          status: Math.random() > 0.3 ? 'Available' : 'In Use',
          sessions: Math.round(Math.random() * 50)
        }
      });
    }

    // Generate edges
    const buildingNodes = nodes.filter(n => n.type === 'building');
    const transformerNodes = nodes.filter(n => n.type === 'transformer');
    const sensorNodes = nodes.filter(n => n.type === 'sensor');

    // Connect buildings to transformers
    buildingNodes.forEach(building => {
      const nearestTransformer = transformerNodes.reduce((nearest, transformer) => {
        const distToCurrent = Math.sqrt(
          Math.pow(building.x - transformer.x, 2) + Math.pow(building.y - transformer.y, 2)
        );
        const distToNearest = nearest ? Math.sqrt(
          Math.pow(building.x - nearest.x, 2) + Math.pow(building.y - nearest.y, 2)
        ) : Infinity;
        return distToCurrent < distToNearest ? transformer : nearest;
      }, null as Node | null);

      if (nearestTransformer) {
        edges.push({
          id: `${building.id}-${nearestTransformer.id}`,
          source: building.id,
          target: nearestTransformer.id,
          type: 'electrical',
          weight: 1,
          color: '#64748b'
        });
      }
    });

    // Connect sensors to buildings
    sensorNodes.forEach(sensor => {
      const nearbyBuildings = buildingNodes.filter(building => {
        const distance = Math.sqrt(
          Math.pow(sensor.x - building.x, 2) + Math.pow(sensor.y - building.y, 2)
        );
        return distance < 100;
      });

      if (nearbyBuildings.length > 0) {
        const targetBuilding = nearbyBuildings[Math.floor(Math.random() * nearbyBuildings.length)];
        edges.push({
          id: `${sensor.id}-${targetBuilding.id}`,
          source: sensor.id,
          target: targetBuilding.id,
          type: 'data',
          weight: 0.5,
          color: '#a855f7'
        });
      }
    });

    // Connect PV and batteries to buildings
    nodes.filter(n => n.type === 'pv' || n.type === 'battery').forEach(asset => {
      const nearbyBuildings = buildingNodes.filter(building => {
        const distance = Math.sqrt(
          Math.pow(asset.x - building.x, 2) + Math.pow(asset.y - building.y, 2)
        );
        return distance < 80;
      });

      if (nearbyBuildings.length > 0) {
        const targetBuilding = nearbyBuildings[0];
        edges.push({
          id: `${asset.id}-${targetBuilding.id}`,
          source: asset.id,
          target: targetBuilding.id,
          type: 'ownership',
          weight: 0.8,
          color: asset.color
        });
      }
    });

    return { nodes, edges };
  };

  const [graphData, setGraphData] = useState(generateGraphData());

  const getNodeTypeConfig = (type: string) => {
    const configs = {
      building: { shape: 'square', layer: 'buildings' },
      transformer: { shape: 'diamond', layer: 'grid' },
      feeder: { shape: 'line', layer: 'grid' },
      sensor: { shape: 'circle', layer: 'sensors' },
      pv: { shape: 'triangle', layer: 'renewables' },
      battery: { shape: 'hexagon', layer: 'storage' },
      ev_charger: { shape: 'circle', layer: 'mobility' }
    };
    return configs[type as keyof typeof configs] || { shape: 'circle', layer: 'buildings' };
  };

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node) => {
    const config = getNodeTypeConfig(node.type);
    const isVisible = visibleLayers[config.layer as keyof typeof visibleLayers];
    
    if (!isVisible) return;

    const x = (node.x + pan.x) * zoom;
    const y = (node.y + pan.y) * zoom;
    const size = node.size * zoom;

    // Highlight selected/hovered nodes
    if (selectedNode?.id === node.id || hoveredNode?.id === node.id) {
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, size + 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.fillStyle = node.color;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;

    // Draw different shapes based on node type
    switch (config.shape) {
      case 'square':
        ctx.fillRect(x - size/2, y - size/2, size, size);
        ctx.strokeRect(x - size/2, y - size/2, size, size);
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size, y + size/2);
        ctx.lineTo(x + size, y + size/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      case 'hexagon':
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = x + size * Math.cos(angle);
          const py = y + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      default:
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    // Draw label for larger nodes or selected nodes
    if (size > 10 || selectedNode?.id === node.id) {
      ctx.fillStyle = '#1f2937';
      ctx.font = `${Math.max(10, size/2)}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(node.label, x, y + size + 15);
    }
  };

  const drawEdge = (ctx: CanvasRenderingContext2D, edge: Edge) => {
    const sourceNode = graphData.nodes.find(n => n.id === edge.source);
    const targetNode = graphData.nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return;

    const sourceConfig = getNodeTypeConfig(sourceNode.type);
    const targetConfig = getNodeTypeConfig(targetNode.type);
    
    const sourceVisible = visibleLayers[sourceConfig.layer as keyof typeof visibleLayers];
    const targetVisible = visibleLayers[targetConfig.layer as keyof typeof visibleLayers];
    
    if (!sourceVisible || !targetVisible) return;

    const x1 = (sourceNode.x + pan.x) * zoom;
    const y1 = (sourceNode.y + pan.y) * zoom;
    const x2 = (targetNode.x + pan.x) * zoom;
    const y2 = (targetNode.y + pan.y) * zoom;

    ctx.strokeStyle = edge.color;
    ctx.lineWidth = edge.weight * zoom;
    ctx.globalAlpha = 0.6;

    // Draw different line styles based on edge type
    if (edge.type === 'data') {
      ctx.setLineDash([5, 5]);
    } else if (edge.type === 'ownership') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else {
      ctx.setLineDash([]);
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw edges first
    graphData.edges.forEach(edge => drawEdge(ctx, edge));

    // Draw nodes
    graphData.nodes.forEach(node => drawNode(ctx, node));
  };

  const getNodeAtPosition = (x: number, y: number): Node | null => {
    const adjustedX = (x - pan.x) / zoom;
    const adjustedY = (y - pan.y) / zoom;

    return graphData.nodes.find(node => {
      const distance = Math.sqrt(
        Math.pow(adjustedX - node.x, 2) + Math.pow(adjustedY - node.y, 2)
      );
      return distance <= node.size;
    }) || null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      setPan({
        x: pan.x + (x - dragStart.x) / zoom,
        y: pan.y + (y - dragStart.y) / zoom
      });
      setDragStart({ x, y });
    } else {
      const node = getNodeAtPosition(x, y);
      setHoveredNode(node);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = getNodeAtPosition(x, y);

    if (node) {
      setSelectedNode(node);
    } else {
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(Math.max(0.1, Math.min(3, zoom * zoomFactor)));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const filteredNodes = graphData.nodes.filter(node =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    render();
  }, [graphData, zoom, pan, visibleLayers, selectedNode, hoveredNode]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Layer toggles */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Layers:</span>
            {Object.entries(visibleLayers).map(([layer, visible]) => (
              <button
                key={layer}
                onClick={() => toggleLayer(layer as keyof typeof visibleLayers)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  visible 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                <span className="capitalize">{layer}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoom(Math.max(0.1, zoom * 0.8))}
            className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(Math.min(3, zoom * 1.25))}
            className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Graph Canvas */}
        <div className="flex-1">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="border border-gray-300 rounded-lg cursor-move"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          />
        </div>

        {/* Node Details Panel */}
        <div className="w-80 bg-white border border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Info className="h-4 w-4" />
            <span>Node Details</span>
          </h4>
          
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900">{selectedNode.label}</h5>
                <p className="text-sm text-gray-600 capitalize">{selectedNode.type.replace('_', ' ')}</p>
              </div>
              
              <div className="space-y-2">
                {Object.entries(selectedNode.data).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>

              {/* Connected nodes */}
              <div>
                <h6 className="font-medium text-gray-900 mb-2">Connected Nodes</h6>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {graphData.edges
                    .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
                    .map(edge => {
                      const connectedNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
                      return connectedNode ? (
                        <div key={edge.id} className="text-xs p-2 bg-gray-50 rounded">
                          <div className="font-medium">{connectedNode.label}</div>
                          <div className="text-gray-600">{edge.type} connection</div>
                        </div>
                      ) : null;
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Click on a node to view details</p>
              <p className="text-sm mt-2">Use mouse wheel to zoom, drag to pan</p>
            </div>
          )}

          {/* Search Results */}
          {searchTerm && (
            <div className="mt-6">
              <h6 className="font-medium text-gray-900 mb-2">Search Results ({filteredNodes.length})</h6>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {filteredNodes.slice(0, 10).map(node => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="w-full text-left text-xs p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium">{node.label}</div>
                    <div className="text-gray-600 capitalize">{node.type.replace('_', ' ')}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-3">Legend</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { type: 'building', color: '#3b82f6', shape: 'square', label: 'Buildings' },
            { type: 'transformer', color: '#ef4444', shape: 'diamond', label: 'Transformers' },
            { type: 'sensor', color: '#8b5cf6', shape: 'circle', label: 'Sensors' },
            { type: 'pv', color: '#eab308', shape: 'triangle', label: 'Solar PV' },
            { type: 'battery', color: '#10b981', shape: 'hexagon', label: 'Batteries' },
            { type: 'ev_charger', color: '#f97316', shape: 'circle', label: 'EV Chargers' }
          ].map(item => (
            <div key={item.type} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 border border-gray-400"
                style={{ 
                  backgroundColor: item.color,
                  transform: item.shape === 'diamond' ? 'rotate(45deg)' : 'none',
                  borderRadius: item.shape === 'circle' ? '50%' : '0'
                }}
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h6 className="font-medium text-gray-900 mb-2">Connection Types</h6>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <span className="text-sm text-gray-700">Electrical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-purple-600" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 2px, #a855f7 2px, #a855f7 4px)' }}></div>
              <span className="text-sm text-gray-700">Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-green-600" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 1px, #10b981 1px, #10b981 3px, transparent 3px, transparent 5px, #10b981 5px, #10b981 6px)' }}></div>
              <span className="text-sm text-gray-700">Ownership</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}