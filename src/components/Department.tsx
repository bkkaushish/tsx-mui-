import React, { useState } from 'react';
import { List } from '@mui/material';
import DepartmentItem from './DepartmentItem/DepartmentItem';
import departments from './Model/Departments&subs';


const DepartmentList: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<Set<number>>(
    new Set()
  );
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    Map<number, Set<number>>
  >(new Map());


  //event
  const handleSelect = (deptId: number, subId?: number) => {

    const updatedDepartments = new Set(selectedDepartments);
    const updatedSubDepartments = new Map(selectedSubDepartments);

    if (subId === undefined) {

      // Toggle entire department
      if (updatedDepartments.has(deptId)) {
        updatedDepartments.delete(deptId);
        updatedSubDepartments.delete(deptId);
      } else {
        updatedDepartments.add(deptId);
        const subSet = new Set(
          departments
            .find(d => d.id === deptId)
            ?.subDepartments.map(sub => sub.id)
        );
        updatedSubDepartments.set(deptId, subSet);
      }
    } else {

      // Toggle sub department
      if (!updatedSubDepartments.has(deptId)) {
        updatedSubDepartments.set(deptId, new Set());
      }
      const subSet = updatedSubDepartments.get(deptId)!;
      if (subSet.has(subId)) {
        subSet.delete(subId);
      } else {
        subSet.add(subId);
      }
      if (subSet.size === 0) {
        updatedSubDepartments.delete(deptId);
      } else {
        updatedSubDepartments.set(deptId, subSet);
      }
      

      // Check if all sub-departments are selected
      const allSelected = departments
        .find(d => d.id === deptId)
        ?.subDepartments.every(sub => subSet.has(sub.id));

      if (allSelected) {
        updatedDepartments.add(deptId);
      } else {
        updatedDepartments.delete(deptId);
      }
    }

    setSelectedDepartments(updatedDepartments);
    setSelectedSubDepartments(updatedSubDepartments);
  };

  return (
    <List>
      {departments.map(dept => (
        <DepartmentItem
          key={dept.id}
          department={dept}
          onSelect={handleSelect}
          selectedDepartments={selectedDepartments}
          selectedSubDepartments={selectedSubDepartments}
        />
      ))}
    </List>
  );
};

export default DepartmentList;