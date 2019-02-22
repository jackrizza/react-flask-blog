import React, {Component} from 'react';

import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';
import {stateToMarkdown} from "draft-js-export-markdown";
import keys from "./lib/key";
import env from "./env";

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

class CreatePost extends Component {
    constructor(props) {
        super(props);
        let uuid = uuidv4()
        this.state = {
            id : uuid,
            alert: null,
            title: "",
            editorState: EditorState.createEmpty()
        };
        this._clearAlert = this._clearAlert.bind(this)
        this._onTitleChange = this
            ._onTitleChange
            .bind(this)
        this.onChange = (editorState) => {
            this.setState({editorState})
        };
    }

    _clearAlert() {
        this.setState({alert : null})
    }

    _onTitleChange(e) {
        this.setState({
            title: document
                .getElementById("title")
                .value
        })
    }
    _onSaveClick(e) {
        e.preventDefault()
        let save = {
            id: this.state.id,
            timeStamp: new Date(),
            title: this.state.title,
            author: localStorage.getItem("username"),
            content: stateToMarkdown(this.state.editorState.getCurrentContent())
        }
        fetch(`${env.getCurrent().api}new_post`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"client_api_key": keys.blog_post_api_key, post: save})

        }).then(Response => {
            Response
                .json()
                .then(res => {
                    res = JSON.parse(res)
                    this.setState({alert: res})
                })
        });
        console.log(save)
    }
    _onTabKeyClick(e) {
        console.log("tab clicked")
        const {editorState} = this.state
        if (e.keyCode === 9) {
            const newEditorState = RichUtils.onTab(e, editorState, 6/* maxDepth */)
            if (newEditorState !== editorState) {
                this.handleEditorChange(newEditorState)
            }

            return
        }

        return getDefaultKeyBinding(e)
    }

    _onBoldClick(e) {
        e.preventDefault()
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    _onItalicClick(e) {
        e.preventDefault()
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }
    _onLinkClick(e) {
        e.preventDefault()
        // this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }
    render() {

        return (
            <div className="uk-container uk-padding">
                {(this.state.alert !== null)
                    ? (this.state.alert.type === "error")
                        ? (
                            <div className="uk-alert-danger" uk-alert="true">
                                <a className="uk-alert-close" onClick={this._clearAlert()} uk-close="true"></a>
                                <p>{this.state.alert.response}</p>
                            </div>
                        ) : (
                            <div className="uk-alert-primary" uk-alert="true">
                                <a className="uk-alert-close" onClick={this._clearAlert()}  uk-close="true"></a>
                                <p>{this.state.alert.response}</p>
                            </div>
                        )
                        : (
                            <div></div>
                        )}
                        
                <form>
                    <fieldset className="uk-fieldset">

                        <div
                            className="uk-card uk-card-primary uk-light  uk-card-small uk-card-body"
                            style={{
                            zIndex: 980
                        }}
                            uk-sticky="bottom: #offset">
                            <div className="uk-margin">
                                <input
                                    className="uk-input uk-form-large"
                                    id="title"
                                    onChange={this._onTitleChange}
                                    id="title"
                                    placeholder="Post Title"/>
                            </div>
                            <div className="uk-margin">
                                <div className="uk-align-left">
                                    <button
                                        onClick={this
                                        ._onBoldClick
                                        .bind(this)}
                                        className="uk-icon-link uk-icon-button uk-margin-small-right"
                                        uk-icon="bold"></button>
                                    <button
                                        onClick={this
                                        ._onItalicClick
                                        .bind(this)}
                                        className="uk-icon-link uk-icon-button uk-margin-small-right"
                                        uk-icon="italic"></button>
                                    <button
                                        onClick={this
                                        ._onLinkClick
                                        .bind(this)}
                                        className="uk-icon-link uk-icon-button uk-margin-small-right"
                                        uk-icon="link"></button>
                                </div>
                                <div className="uk-align-right">
                                    <button
                                        onClick={this
                                        ._onSaveClick
                                        .bind(this)}
                                        className="uk-icon-link uk-icon-button uk-margin-small-right"
                                        uk-icon="cloud-upload"></button>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            onTab={this.handleKeyBindings}
                            placeholder="Type Something Amazing...."
                            autoCapitalize={true}
                            spellCheck={true}/>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default CreatePost;