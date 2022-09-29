import React from "react";

export default class SidebarHeading extends React.Component {
    handleClick = (event) => {
        const { createNewListCallback, currentList, isModalOpen } = this.props;
        if (!currentList && !isModalOpen) {
            createNewListCallback();
        }
        else {
            console.log('playlist currently open or a modal is open: could not create a new list');
        }
    };
    render() {
        const { currentList, isModalOpen } = this.props;
        let addListClass = "toolbar-button";
        if (isModalOpen) {
            addListClass += " disabled";
        }
        else {
            if (currentList) addListClass += " disabled";    
        }
        return (
            <div id="sidebar-heading">
                <input 
                    type="button" 
                    id="add-list-button" 
                    className={addListClass} 
                    onClick={this.handleClick}
                    value="+" />
                Your Playlists
            </div>
        );
    }
}