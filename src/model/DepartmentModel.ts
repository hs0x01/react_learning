import { BaseModel } from "./BaseModel";
import { EmployeeListModel } from "./EmployeeListModel";
import { EmployeeModel } from "./EmployeeModel";

/**
 * 部署モデルです。
 */
export class DepartmentModel extends BaseModel {

    /**
     * 部署名です。
     */
    name: string;

    /**
     * 社員リストモデルです。
     */
    employeeListModel: EmployeeListModel;

    /**
     * コンストラクタです。
     * @param id 部署のID
     * @param name 部署名
     * @param employeeListModel 社員リストモデル
     */
    constructor (id: string, name: string, employeeListModel: EmployeeListModel) {
        super(id);
        this.name = name || '';
        this.employeeListModel = employeeListModel || null;
    }

    /**
     * 当部署に社員を追加します。
     * @param employeeId 社員ID
     * @param employeeName 社員名
     */
    addEmployee(employeeId: string, employeeName: string) {
        let employeeModel: EmployeeModel = new EmployeeModel(employeeId, employeeName, this);
        this.employeeListModel.employeeModelList.push(employeeModel);
    }

    /**
     * 当部署から社員を削除します。
     * @param employeeId 社員ID
     */
    deleteEmployee(employeeId: string) {
        let employeeModelList: Array<EmployeeModel> = this.employeeListModel.employeeModelList;
        for (let i = 0; i < employeeModelList.length; i++) {
            let employeeModel: EmployeeModel = employeeModelList[i];
            if (employeeModel.id === employeeId) {
                // 社員削除
                this.employeeListModel.employeeModelList.splice(i, 1);
            }
        }
    }
}
