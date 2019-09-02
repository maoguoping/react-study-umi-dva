import React, {useState, useEffect, useRef} from 'react'
import {withRouter } from 'react-router'
import './style.scss'
import { message, Button } from 'antd'
import SearchBox from '../../../components/module/searchBox' 
import UserListTable from './components/userListTable'
import Modal from '../../../components/module/dialogModal'
import http from '../../../utils/axios'
import router from 'umi/router';
import { connect } from 'dva';
function UserList (props){
  const { dispatch, auth } = props;
  const { roleList } = auth; 
  let deleteList = useRef([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchList, setSearchList] = useState([
    {
      label: '用户名',
      placeholder: '请输入用户名',
      type: 'input',
      name: 'username'
    },
    {
      label: '用户id',
      placeholder: '请输入用户id',
      type: 'input',
      name: 'userId'
    },
    {
      label: '用户角色',
      placeholder: '请选择用户角色',
      type: 'select',
      name: 'roleId',
      options: []
    }
  ]);
  const [tableData, setTableData] = useState([]);
  const deleteModalData = {
    title: '删除用户',
    text: '确定要删除该用户？',
    type: 'question-circle'
  };
  useEffect(() => {
    dispatch({
      type: 'auth/getRoleList',
      payload: {}
    });
  }, [dispatch]);
  useEffect(() => {
    console.debug('角色列表', roleList);
    const newSearchList = searchList.map(item => {
      if (item.name === 'roleId') {
        item.options = roleList;
      }
      return item;
    }) 
    setSearchList(newSearchList);
  },[roleList]);
  useEffect(() => {
    getUserList();
  }, []);
  function getUserList(info) {
    let params = info || {};
    http.post('/getUserList',params).then(res => {
      console.log(res);
      setTableData(res.data.list)
    }).catch(err => {
    })
  }
  function deleteUser() {
    http.get('/deleteUser',{
      userId: deleteList.current[0]
    }).then(res => {
      message.success('删除用户成功');
      getUserList();
    }).catch(err => {
    })
  }
  function onDeleteUser (e) {
    deleteList.current.push(e.userId);
    setShowDeleteModal(true);
  }
  function onAddUser () {
    router.push(`/managerCenter/userList/userDetail?mode=new`);
  }
  function  onDeleteConfirm (e) {
    setShowDeleteModal(false);
    deleteUser();
  }
  function onDeleteCancel (e) {
    deleteList.current = [];
    setShowDeleteModal(false);
  }
  function onSearch (e) {
    console.log('搜索信息', e);
    let userId = e.userId || '';
    let roleId = e.roleId || '';
    let username = e.username || '';
    getUserList({
      userId,
      roleId,
      username
    });
  }
  function onDetail (e) {
    console.log('查看详情');
    let userId = e.userId || '';
    router.push(`/managerCenter/userList/userDetail?mode=edit&userId=${userId}`);
  }
  return (
    <div className="user-list-page">
    <div className="user-list-search">
      <SearchBox  list={searchList} onSearch={onSearch}></SearchBox>
    </div>
    <div className="user-list-action-bar">
      <Button type="primary" onClick={onAddUser}>新增</Button>
    </div>
    <div className="user-list-content">
      <UserListTable data={tableData} roleList={roleList} onDelete={onDeleteUser} onDetail={onDetail}></UserListTable>
    </div>
    <Modal value={showDeleteModal} data={deleteModalData} onConfirm={onDeleteConfirm} onCancel = {onDeleteCancel}></Modal>
  </div>
  )
}
export default connect(({auth, page}) => ({auth, page}))(withRouter(UserList));
