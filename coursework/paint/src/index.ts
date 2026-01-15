import './styles.css';
import { ToolSelection, ToolType } from './tool-selection';
import { ShapeManager } from './ShapeManager';

const ToolSelectionWidget = new ToolSelection((ToolType) => console.log(ToolType));
const shapeManager = new ShapeManager();
