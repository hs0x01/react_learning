import { EmployeeModel } from '../model/EmployeeModel';
import styles from './EmployeeListView.module.css';

/**
 * 社員リストビューのPropsです。
 */
export interface EmployeeListViewProps {

    /**
     * 社員リストです。
     */
    employeeList: Array<EmployeeModel>,

    /**
     * コールバック関数です。
     * 
     * @param employeeId 社員ID
     */
    callback: (employeeId: string) => void
}

/**
 * 社員リストのビューです。
 * 
 * @param props 社員リストビューのProps
 * @returns TypeScript XMLの要素
 */
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
