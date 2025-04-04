import React, { useState } from "react";
import "../styles/Sidebar.css";
import {
  FaHome,
  FaChartBar,
  FaCog,
  FaHistory,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Sidebar = ({ onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2>FoodLevel</h2>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item" onClick={() => onSectionChange("Inicio")}>
          <FaHome className="icon" />
          {!isCollapsed && <span>Inicio</span>}
        </li>
        <li className="menu-item" onClick={() => onSectionChange("Graficas")}>
          <FaChartBar className="icon" />
          {!isCollapsed && <span>Gráficas</span>}
        </li>
        <li className="menu-item" onClick={() => onSectionChange("Controles")}>
          <FaCog className="icon" />
          {!isCollapsed && <span>Controles</span>}
        </li>
        <li className="menu-item" onClick={() => onSectionChange("Historial")}>
          <FaHistory className="icon" />
          {!isCollapsed && <span>Historial</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
