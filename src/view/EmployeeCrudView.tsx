import { useEffect, useRef, useState } from 'react';
import { EmployeeModel } from '../model/EmployeeModel';
import { DepartmentListModel } from '../model/DepartmentListModel';
import { DepartmentModel } from '../model/DepartmentModel';
import { DepartmentRepository } from '../repository/DepartmentRepository';
import EmployeeListView from './EmployeeListView';

/**
 * 社員CRUD機能のビューです。
 * 
 * @returns TypeScript XMLの要素
 */
export default function EmployeeCrudView(): JSX.Element {

    

    // ------------------------------------------------------------------------
    // useState使用(変更時に画面再描画が必要なデータ)
    // ------------------------------------------------------------------------
    // 部署モデルのリストを扱うモデル
    const [departmentListModel, setDepartmentListModel] = useState<DepartmentListModel>(new DepartmentListModel('', []));
    // 社員モデルのリスト
    const [employeeList, setEmployeeList] = useState<Array<EmployeeModel>>([]);
    // 社員ID(更新)
    const [employeeId, setEmployeeId] = useState('');
    // 社員名(更新)
    const [employeeName, setEmployeeName] = useState('');
    // 部署ID(更新)
    const [departmentId, setDepartmentId] = useState('');

    // ------------------------------------------------------------------------
    // useRef使用(変更時に画面再描画が不要なデータ)
    // ------------------------------------------------------------------------
    // 社員ID(検索)
    const employeeIdFindRef = useRef<HTMLInputElement>(null);
    // 社員名(検索)
    const employeeNameFindRef = useRef<HTMLInputElement>(null);
    // 部署ID(検索)
    const departmentIdFindRef = useRef<HTMLSelectElement>(null);

    // 初期化処理
    useEffect(() => {
        
        // 画面タイトルの設定
        document.title = '社員CRUD';

        // すべての部署と社員を取得
        DepartmentRepository.findDepartmentAll((departmentListModel: DepartmentListModel) => {
            // departmentListModelの更新
            setDepartmentListModel(departmentListModel);
            // 検索条件で社員リストを検索
            findEmployeeListByCondition(departmentListModel);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // useEffectフックと[]の2番目の引数でマウント時に1回のみ呼び出される
    // https://www.twilio.com/ja-jp/blog/react-choose-functional-components-jp

    /**
     * 検索条件で社員リストを検索します。
     * 
     * @param _departmentListModel 部署モデルのリストを扱うモデル
     */
    function findEmployeeListByCondition(_departmentListModel?: DepartmentListModel) {

        if (!_departmentListModel) {
            // 引数未設定時はuseStateされたdepartmentListModelを使う
            _departmentListModel = departmentListModel;
        }

        // 検索条件
        const employeeIdFind = employeeIdFindRef.current!.value!;
        const employeeNameFind = employeeNameFindRef.current!.value!;
        const departmentIdFind = departmentIdFindRef.current!.value!;

        // 社員リストを検索
        const employeeModelList: Array<EmployeeModel> = 
            _departmentListModel.findEmployeeListByArgs(employeeIdFind, employeeNameFind, departmentIdFind);
        
        // 社員リストを検索結果で更新
        setEmployeeList(employeeModelList);
    }

    /**
     * 社員を選択します。
     * 
     * @param employeeId 社員ID
     */
    function selectEmployee(employeeId: string) {
        const employee = departmentListModel.findEmployeeListByArgs(employeeId, '', '')[0];
        setEmployeeId(employeeId);
        setEmployeeName(employee.name);
        setDepartmentId(employee.departmentModel!.id);
    }

    /**
     * 部署に社員を追加可能か判定し、結果を返します。
     * @return 追加可能であれば<code>true</code>、そうでなければ<code>false</code>
     */
    function canAddEmployee(): boolean {

        if (!employeeId) {
            return false;
        }
        if (!employeeName) {
            return false;
        }
        if (!departmentId) {
            return false;
        }

        const employeeList: Array<EmployeeModel> = departmentListModel.findEmployeeListByArgs(employeeId, '', '');
        if (employeeList.length > 0) {
            return false;
        }

        return true;
    }

    /**
     * 社員情報を更新可能か判定し、結果を返します。
     * @return 更新可能であれば<code>true</code>、そうでなければ<code>false</code>
     */
    function canUpdateEmployee(): boolean {

        if (!employeeId) {
            return false;
        }
        if (!employeeName) {
            return false;
        }
        if (!departmentId) {
            return false;
        }

        const employeeList: Array<EmployeeModel> = departmentListModel.findEmployeeListByArgs(employeeId, '', '');
        if (employeeList.length === 0) {
            return false;
        }

        return true;
    }

    /**
     * 部署から社員を削除可能か判定し、結果を返します。
     * @return 削除可能であれば<code>true</code>、そうでなければ<code>false</code>
     */
    function canDeleteEmployee(): boolean {
        if (!employeeId) {
            return false;
        }
        const employeeList: Array<EmployeeModel> = departmentListModel.findEmployeeListByArgs(employeeId, '', '');
        if (employeeList.length === 0) {
            return false;
        }

        return true;
    }


    /**
    * 部署に社員を追加します。
    */
    function addEmployee() {

        if (!canAddEmployee()) {
            return;
        }

        const departmentModel: DepartmentModel = departmentListModel.findDepartmentById(departmentId)!;

        // 追加
        departmentModel.addEmployee(employeeId, employeeName);

        // 入力値をリセット
        resetInput();

        // 再検索
        findEmployeeListByCondition();
    }

    /**
     * 社員情報を更新します。
     */
    function updateEmployee() {

        if (!canUpdateEmployee()) {
            return;
        }

        const employee: EmployeeModel = departmentListModel.findEmployeeListByArgs(employeeId, '', '')[0];
        const departmentModel: DepartmentModel = departmentListModel.findDepartmentById(departmentId)!;

        // 更新
        employee.updateEmployeeInfo(employeeName, departmentModel);

        // 入力値をリセット
        resetInput();

        // 再検索
        findEmployeeListByCondition();
    }

    /**
     * 部署から社員を削除します。
     */
    function deleteEmployee() {

        if (!canDeleteEmployee()) {
            return;
        }

        const employee: EmployeeModel = departmentListModel.findEmployeeListByArgs(employeeId, '', '')[0];

        // 削除
        employee.departmentModel!.deleteEmployee(employeeId);

        // 入力値をリセット
        resetInput();

        // 再検索
        findEmployeeListByCondition();
    }

    /**
     * 入力値をリセットします。
     */
    function resetInput() {
        setEmployeeId('');
        setEmployeeName('');
        setDepartmentId('');
        employeeIdFindRef.current!.value = '';
        employeeNameFindRef.current!.value = '';
        departmentIdFindRef.current!.value = '';
    }

    /**
     * すべての部署と所属する社員を保存します。
     */
    function saveDepartmentAll() {
        DepartmentRepository.saveDepartmentAll(departmentListModel, () => {
        });
    }

    return (
        <>
            <table>
                <tr>
                    <td>社員ID(検索)</td>
                    <td><input type="text" onChange={(e) => findEmployeeListByCondition()} ref={employeeIdFindRef} /></td>
                </tr>
                <tr>
                    <td>社員名(検索)</td>
                    <td><input type="text" onChange={(e) => findEmployeeListByCondition()} ref={employeeNameFindRef} /></td>
                </tr>
                <tr>
                    <td>部署名(検索)</td>
                    <td>
                        <select onChange={(e) => findEmployeeListByCondition()} ref={departmentIdFindRef}>
                            {(<option key="" value=""></option>)}
                            {
                                departmentListModel.departmentModelList.map((department, idx) => (
                                    <option key={idx} value={department.id}>{department.name}</option>
                                ))
                            }
                        </select>
                    </td>
                </tr>
            </table>
            <hr />
            <div>
                <EmployeeListView employeeList={employeeList} callback={selectEmployee}></EmployeeListView>
            </div>
            <hr />
            <table>
                <tr>
                    <td>社員ID(更新)</td>
                    <td><input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>社員名(更新)</td>
                    <td><input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>部署名(更新)</td>
                    <td>
                        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                            {(<option key="" value=""></option>)}
                            {
                                departmentListModel.departmentModelList.map((department, idx) => (
                                    <option key={idx} value={department.id}>{department.name}</option>
                                ))
                            }
                        </select>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td><input type="button" value="登録" disabled={!canAddEmployee()} onClick={addEmployee} /></td>
                    <td><input type="button" value="更新" disabled={!canUpdateEmployee()} onClick={updateEmployee} /></td>
                    <td><input type="button" value="削除" disabled={!canDeleteEmployee()} onClick={deleteEmployee} /></td>
                </tr>
                <tr>
                    <td>
                        <input type="button" value="保存" onClick={saveDepartmentAll} />
                    </td>
                </tr>
            </table>
        </>
    );
}
