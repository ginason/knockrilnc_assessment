import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as homeAction from '../../Data/Home/action';

import * as parseUrlParameter from '../../Lib/parseUrlParameter';
//style
import styleHome from '../../css/home.css';
class ApplicationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos : [],
            commentList: [],
            application: {},
            name: '',
            candidateId: 0,
        };
        this.video = [];
        this.getApplication = this.getApplication.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.getComment = this.getComment.bind(this);
        this.createComment = this.createComment.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.updateComment = this.updateComment.bind(this);

    }
    componentWillMount() {
        let urlParams = parseUrlParameter.parse(this.props.location.search);
        this.setState({
            name: urlParams.name,
            candidateId: urlParams.id});
        this.getApplication(urlParams.id);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            return true;
        }
        if(this.props.location.search !== nextProps.location.search) {
            let urlParams = parseUrlParameter.parse(nextProps.location.search);
            this.setState({
                name: urlParams.name,
                candidateId: urlParams.id});
            this.getApplication(urlParams.id);
            return true;
        }
        if (nextState !== this.state) {
            return true;
        }

        return false;
    }
    getApplication(id) {
        if(Number(id) === 0) {
            this.setState({
                videos: [],
            });
        } else {
            let params = {id: id};
            this.props.dispatch(homeAction.getApplication(params))
                .then(response => {
                    let videoList = response.application.videos;
                    let commentList = [];
                    videoList.forEach((data, index) => {
                        this.getQuestion(data.questionId, (e, result) => {
                            if(e) throw e;
                            videoList[index].question = result;
                        });
                        this.getComment(data.id, (e, result) => {
                            if(e) throw e;
                            videoList[index].comments.id = result.length > 0 && result[0].id ? result[0].id : 0;
                            videoList[index].comments.comment = result.length > 0 && result[0].comment ? result[0].comment : "";
                            videoList[index].comments.videoId = result.length > 0 && result[0].videoId ? result[0].videoId : videoList[index].id;

                            commentList.push({comment: "", id: index});
                        });
                    });
                    setTimeout(() => {
                        this.setState({
                            application: response.application,
                            videos: videoList,
                            commentList: commentList
                        });
                    },1000);

                }).catch(error => {
                console.log(error);
            });
        }

    }
    getQuestion(id, callback) {
        let params = {id: id};
        this.props.dispatch(homeAction.getQuestion(params))
            .then(response => {
                callback(null, response.question.question);
            }).catch(error => {
            callback(error, null);
        });
    }
    handleComment(e, id, index) {
        let commentList = this.state.commentList;
        commentList[index].comment = e.target.value;
            this.setState({
                commentList: commentList
            });
    }
    submitComment(id, comments, index) {
        let commentInfo = comments;
        if(comments.id === 0) {
            this.createComment(id, (err, res) => {
                commentInfo.id = res.comments.id || res.id;
                this.updateComment(id, commentInfo.id, index);
            })
        } else {
            this.updateComment(id, comments.id, index);
        }

    }
    updateComment(videoId, commentId, index) {
        let params = {
            videoId : Number(videoId),
            id: commentId,
            comment: this.state.commentList[index].comment
        };

        this.props.dispatch(homeAction.updateComment(params))
            .then(response => {
                this.getApplication(this.state.candidateId);
            }).catch(error => {
                console.log(err);
        });
    }
    createComment(id, callback) {
        let params = {
            videoId : Number(id),
            comment: ""
        };
        this.props.dispatch(homeAction.postComment(params))
            .then(response => {
                callback(null, response);
            }).catch(error => {
            callback(error, null);
        });

    }
    getComment(videoId, callback) {
        let params = {videoId: Number(videoId)};
        this.props.dispatch(homeAction.getComment(params))
            .then(response => {
                callback(null, response.comments);
            }).catch(error => {
            callback(error, null);
        });
    }
    render() {
        let renderVideo = this.state.videos && this.state.videos.length > 0 ? this.state.videos.map((data, index) => {
            return(
                <li key={index} className={styleHome.applicationList}>
                    <iframe src={data.src} width="420" height="315" />
                    <div className={styleHome.headline}>Question</div>
                    <div  className={styleHome.text}>{data.question ? data.question : 'N/A'}</div>
                    <div className={styleHome.headline}>Comments</div>
                    <div  className={styleHome.text}>{data.comments !== {} && data.comments.comment ? data.comments.comment : 'N/A'}</div>
                    <input className={styleHome.inputS} type={'text'} value={this.state.commentList[index].comment} onChange={(e) => this.handleComment(e, data.id, index)} />
                    <div className={styleHome.btn} onClick={() => this.submitComment(data.id, data.comments, index)}>submit</div>
                </li>
            )
        }) : <div className={styleHome.defaultText}>Sorry, this information is not available.</div> ;

        return(
            <div className={styleHome.applicationContainer}>
                <h2>{this.state.name}</h2>
                <ul>
                    {renderVideo}
                </ul>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        home: state.data.home,
    };
})(withRouter(ApplicationContainer));