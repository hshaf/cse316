import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(props) {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.selectedDeleteList) {
        name = store.selectedDeleteList.name;
    }

    let deleteListModal =
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                        Delete playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the <span id="delete-list-span">{name}</span> playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            onClick={store.deleteList}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            onClick={store.hideDeleteListModal}
                            value='Cancel' />
                    </div>
                </div>
        </div>

    return (
        deleteListModal
    );
}

export default DeleteListModal;