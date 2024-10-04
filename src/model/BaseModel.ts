/**
 * すべてのモデルが共通に継承すべきモデルです。
 */
export abstract class BaseModel {
    
    /**
     * オブジェクトIDです。
     * <p>
     * オブジェクトを一意に特定します。
     * </p>
     */
    id: string;

    /**
     * オブジェクトIDを引数にとるコンストラクタです。
     * @param id オブジェクトID
     */
    constructor (id: string) {
        this.id = id || '';
    }
};
