import './styles.css';
import { ToolSelection, ToolType } from './tool-selection';
import { ShapeManager } from './ShapeManager';

const shapeManager = new ShapeManager();
const ToolSelectionWidget = new ToolSelection((ToolType) => shapeManager.currentToolType = ToolType);
