import { BaseModel } from "./BaseModel";
import { DepartmentModel } from "./DepartmentModel";

/**
 * 社員モデルです。
 */
export class EmployeeModel extends BaseModel {

    /**
     * 社員名です。
     */
    name: string;

    /**
     * 所属部署です。
     */
    departmentModel: DepartmentModel | null;

     /**
     * コンストラクタです。
     * @param id - 社員ID
     * @param name - 社員名
     * @param departmentModel - 所属部署のモデル
     */
     constructor (id: string, name: string, departmentModel: DepartmentModel) {

        super(id);

        this.name = name || '';
        this.departmentModel = departmentModel || null;
    }

    /**
     * 社員情報を更新します。
     * @param name 社員名
     * @param departmentModel 新しく所属する部署モデル
     */
    updateEmployeeInfo(name: string, departmentModel: DepartmentModel) {

        this.name = name;

        if (this.departmentModel!.id !== departmentModel.id) {

            let employeeModelList: Array<EmployeeModel>= this.departmentModel!.employeeListModel.employeeModelList;

            for (let i = 0; i < employeeModelList.length; i++) {

                let employeeModel: EmployeeModel = employeeModelList[i];

                if (employeeModel.id === this.id) {
                    // 元の部署から社員を削除
                    employeeModelList.splice(i, 1);
                    break;
                }
            }

            // 新規部署に社員を追加
            departmentModel.employeeListModel.employeeModelList.push(this);

            // 社員の部署を新規に更新
            this.departmentModel = departmentModel;
        }
    }
}
