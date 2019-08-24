import React, {useState, useEffect} from 'react'
import './style.scss'
import { Layout, Breadcrumb, PageHeader, Button, Icon } from 'antd'
import HeadBar from '../../components/module/headerBar'
import SideMenu from '../../components/module/sideMenu'
import router from 'umi/router';
import { connect } from 'dva';
const { Content, Sider } = Layout;
function ManagerCenter (props) {
    const { dispatch, auth } = props;
    const defaultValue = ['1','sub1','child1'];
    const [selectValue, setSelectValue] = useState('');
    const headerMenuList = [
        {
            value: '1',
            label: '管理中心',
        },
        {
            value: '2',
            label: '数据中心'
        },
        {
            value: '3',
            label: '设置'
        }
    ];
    const sideMenuList = [
        {
            value: 'sub1',
            iconType: 'user',
            label: '用户管理',
            children: [
                {
                    value: 'child1',
                    label: '用户列表',
                    target: '/managerCenter/userList'
                },
                {
                    value: 'child2',
                    label: '角色列表',
                    target: '/managerCenter/roleList'
                },
                {
                    value: 'child3',
                    label: '权限列表',
                    target: '/managerCenter/rightList'
                }
            ]
        },
        {
            value: 'sub2',
            iconType: 'laptop',
            label: '设备管理',
            children: [
                {
                    value: 'child4',
                    label: '设备列表',
                    target: '/managerCenter/deviceList'
                },
                {
                    value: 'child5',
                    label: '设备事件',
                    target: '/managerCenter/deviceEventsList'
                }
            ]
        }
    ];
    useEffect(() => {
        let username = auth.userInfo.username;
        if(!username) {
            router.push('/login');
        }
        console.debug('用户名', username);
    }, [auth]);
    function changeTabMenu(e) {
        let {key} = e;
        for(const item of props.headerMenuList) {
            if (item.value === key) {
                setSelectValue(props.menuPathInfo.pathNameList);
                props.setCurrentHeader({
                    value: key,
                    label: item.value
                })
                break;
            }
        }
    }
    function changeSideMenu(e) {
        let {keyPath} = e;
        keyPath = keyPath.reverse();
        const sideList = sideMenuList;
        const firstSideValue = keyPath[0];
        const secondSideValue = keyPath[1];
        let firstSideLabel = null;
        let secondSideLabel = null;
        let target = null;
        for (const item of sideList) {
            if (item.value === firstSideValue) {
                firstSideLabel = item.label;
                for (const child of item.children) {
                    if (child.value === secondSideValue) {
                        secondSideLabel = child.label;
                        target = child.target
                        break;
                    }
                }
                break;
            }
        }
        router.push(target);
    }
    function onLogout() {
        dispatch({
            type: 'auth/setUserInfo',
            payload: {
                username: ''
            }
        });
    }
    function onBack () {
        props.history.goBack();
    }
    return (
        <Layout className="App">
            <HeadBar list={headerMenuList} onChange={changeTabMenu} onLogout={onLogout}></HeadBar>
            <Layout className="main">
                <Sider width={200} style={{ background: '#fff' }}>
                    <SideMenu value={selectValue} defaultValue={defaultValue} list={sideMenuList} onClick={changeSideMenu}></SideMenu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <div className="navigator-bar">
                        {/* <Breadcrumb className="page-breadcrumb" style={{ margin: '16px 0' }}>
                            {props.menuPathInfo.pathNameList.map(item => <Breadcrumb.Item key={'list' + item}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        {props.innerPageList.length > 0 && <Button type="primary" onClick={onBack}>返回</Button>} */}
                    </div>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    > 
                     {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default connect(({auth}) => ({auth}))(ManagerCenter);
