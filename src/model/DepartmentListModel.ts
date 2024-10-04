import { BaseModel } from "./BaseModel";
import { DepartmentModel } from "./DepartmentModel";
import { EmployeeListModel } from "./EmployeeListModel";
import { EmployeeModel } from "./EmployeeModel";

/**
 * 部署モデルのリストを扱うモデルです。
 */
export class DepartmentListModel extends BaseModel {

    /**
     * 部署モデルのリストです。
     */
    departmentModelList: Array<DepartmentModel> = [];

    /**
     * コンストラクタです。
     * @param id 当モデルのID
     * @param departmentModelList 部署モデルのリスト
     */
    constructor(id: string, departmentModelList: Array<DepartmentModel>) {
        super(id);
        this.departmentModelList = departmentModelList || [];
    }

    /**
     * 引数を条件に社員モデルを検索します。
     * <ul>
     *  <li>引数の値が設定されている場合、その値をAND条件として、検索条件に追加します。</li>
     *  <li>引数の値が<code>null</code>の場合、その値を検索条件に追加しません。</li>
     * </ul>
     *
     * @param employeeId 社員ID
     * @param employeeName 社員名
     * @param departmentId 部署ID
     * @return 社員モデルのリスト。検索結果が0件の場合、空の配列を返します。
     */
    findEmployeeListByArgs(employeeId: string, employeeName: string, departmentId: string): Array<EmployeeModel> {
    
        let resultList: Array<EmployeeModel> = [];

        for (let i = 0; i < this.departmentModelList.length; i++) {

            let departmentModel: DepartmentModel = this.departmentModelList[i];
            let employeeListModel: EmployeeListModel = departmentModel.employeeListModel;

            let employeeModelList: Array<EmployeeModel> = employeeListModel.employeeModelList;

            for (let j = 0; j < employeeModelList.length; j++) {

                let employeeModel: EmployeeModel = employeeModelList[j];

                if (employeeId && employeeId !== employeeModel.id) {
                    continue;
                }
                if (employeeName && employeeModel.name.indexOf(employeeName) < 0) {
                    continue;
                }
                if (departmentId && departmentId !== employeeModel.departmentModel?.id) {
                    continue;
                }

                // 返却する結果リストに追加
                resultList.push(employeeModel);
            }
        }

        return resultList;
    }

    /**
     * 部署IDを条件に部署モデルを検索します。
     * @param departmentId 部署ID
     * @return 部署モデル。検索結果が0件の場合、<code>null</code>を返します。
     */
    findDepartmentById(departmentId: string): DepartmentModel | null {

        for (let i = 0; i < this.departmentModelList.length; i++) {

            let departmentModel: DepartmentModel = this.departmentModelList[i];

            if (departmentId === departmentModel.id) {
                return departmentModel;
            }
        }

        return null;
    }
}
