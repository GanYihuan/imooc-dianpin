import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import * as userInfoActionsFromOtherFiles from '../../actions/userinfo';
import Header from '../../components/Header/index'
import LoginComponent from './subpage/LoginComponent';