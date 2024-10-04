import { EmployeeModel } from '../model/EmployeeModel';
import styles from './EmployeeListView.module.css';

interface EmployeeListViewProps {
    employeeList: Array<EmployeeModel>,
    callback: (employeeId: string) => void
}

export default function EmployeeListView(props: EmployeeListViewProps): JSX.Element {

    return (<table className={styles.employeeListView}>
        <thead>
            <tr>
                <th>社員ID</th>
                <th>社員名</th>
                <th>部署名</th>
            </tr>
        </thead>
        <tbody>
            {
                props.employeeList.map((employee, idx) => (
                    <tr key={idx} onClick={() => { props.callback(employee.id) }}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.departmentModel!.name}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>);
}
