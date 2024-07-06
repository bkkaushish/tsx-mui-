

export  interface SubDepartment {
    id: number;
    name: string;
  }
  
 export interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
  }

  export interface DepartmentProps {
    department: Department;
    onSelect: (id: number, subId?: number) => void;
    selectedDepartments: Set<number>;
    selectedSubDepartments: Map<number, Set<number>>;
  }
  
  const departments: Department[] = [
    {
      id: 1,
      name: 'Department 1',
      subDepartments: [
        { id: 1, name: 'Sub Department 1.1' },
        { id: 2, name: 'Sub Department 1.2' }
      ]
    },
    {
      id: 2,
      name: 'Department 2',
      subDepartments: [
        { id: 3, name: 'Sub Department 2.1' },
        { id: 4, name: 'Sub Department 2.2' }
      ]
    }
  ];

  
  export default departments;