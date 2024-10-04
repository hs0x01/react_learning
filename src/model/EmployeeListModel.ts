import { BaseModel } from "./BaseModel";
import { EmployeeModel } from "./EmployeeModel";

/**
 * 社員モデルのリストを扱うモデルです。
 */
export class EmployeeListModel extends BaseModel {

    /**
     * 社員モデルのリストです。
     */
    employeeModelList: Array<EmployeeModel>;

    /**
     * コンストラクタです。
     * @param id 社員リストモデルID
     * @param employeeModelList 社員モデルリスト
     */
    constructor (id: string, employeeModelList: Array<EmployeeModel>) {
        super(id);
        this.employeeModelList = employeeModelList || [];
    }
}
