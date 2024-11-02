import FolderIcon from '@mui/icons-material/Folder';
import SupportIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li><FolderIcon/> Mis Ecografías</li>
        <li><SupportIcon/> Soporte</li>
        <li><SettingsIcon/> Ajustes</li>
      </ul>
    </div>
  );
};

export default Sidebar;