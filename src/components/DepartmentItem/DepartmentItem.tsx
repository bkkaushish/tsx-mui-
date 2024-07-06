import React, { useState ,useEffect} from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  IconButton
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DepartmentProps } from '../Model/Departments&subs';



//function
const DepartmentItem: React.FC<DepartmentProps> = ({
  department,
  onSelect,
  selectedDepartments,
  selectedSubDepartments
}) => {

  const [open, setOpen] = useState(false);

  //auto expand
  useEffect(() => {
    if (selectedDepartments.has(department.id)) {
      setOpen(true);
      
    }
  }, [selectedDepartments, department.id]);

  //events
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDepartmentSelect = () => {
    onSelect(department.id);
  };

  const handleSubDepartmentSelect = (subId: number) => {
    onSelect(department.id, subId);
  };

  
  const allSubSelected = department.subDepartments.every(sub =>
    selectedSubDepartments.get(department.id)?.has(sub.id)
  );

  const isDepartmentSelected = selectedDepartments.has(department.id);

  return (
    <>
      <ListItem>
        <Checkbox
          edge="start"
          checked={isDepartmentSelected || allSubSelected}
          tabIndex={-1}
          disableRipple
          onChange={handleDepartmentSelect}
        />
        <ListItemText primary={department.name} />
        <IconButton onClick={handleToggle}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {department.subDepartments.map(sub => (
            <ListItem key={sub.id} sx={{ pl: 4 }}>
              <Checkbox
                edge="start"
                checked={selectedSubDepartments
                  .get(department.id)
                  ?.has(sub.id) || false}
                tabIndex={-1}
                disableRipple
                onChange={() => handleSubDepartmentSelect(sub.id)}
              />
              <ListItemText primary={sub.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default DepartmentItem;