import React, {useState, useEffect, useLayoutEffect} from 'react'
import './style.scss'
import { Layout, Breadcrumb, PageHeader, Button, Icon } from 'antd'
import HeadBar from '../../components/module/headerBar'
import SideMenu from '../../components/module/sideMenu'
import router from 'umi/router';
import { connect } from 'dva';
import LoadingPage from '../../components/module/loadingPage'
const { Content, Sider } = Layout;
function ManagerCenter (props) {
    const { dispatch, auth, page } = props;
    const defaultValue = ['sub1','child1'];
    const [selectValue, setSelectValue] = useState(['sub1','child1']);
    const [routeInfoReady, setRouteInfoReady] = useState(true);
    const [headPathNameList, setHeadPathNameList] = useState([]);
    const [sidePathNameList, setSidePathNameList] = useState([]);
    const [innerPathNameList, setInnerPathNameList] = useState([]);
    const headerMenuList = page.headerMenuList;
    const sideMenuList = page.sideMenuList;
    const innerPageList = page.innerPageList;
    useLayoutEffect(() => {
        console.debug('setRouteInfoReady', auth.routeInfo)
        if(auth.routeInfo) {
            setRouteInfoReady(true);
        } else {
            setRouteInfoReady(false);
        }
    }, [auth.routeInfo])
    useEffect(() => {
        let arr = [page.currentHeader.label];
        setHeadPathNameList(arr);
    }, [page.currentHeader]);
    useEffect(() => {
        let arr = []
        page.currentSide.forEach(item => {
            arr.push(item.label);
        });
        setSidePathNameList(arr);
    }, [page.currentSide]);
    useEffect(() => {
        let arr = []
        page.innerPageList.forEach(item => {
            arr.push(item.label);
        });
        setInnerPathNameList(arr);
    }, [page.innerPageList]);
    function changeTabMenu(e) {
        let {key} = e;
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
        setSelectValue(keyPath);
        router.push(target);
    }
    function onLogout() {
        dispatch({
            type: 'auth/logout',
            payload: {}
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
                        <Breadcrumb className="page-breadcrumb" style={{ margin: '16px 0' }}>
                            {[...headPathNameList,...sidePathNameList,...innerPathNameList].map(item => <Breadcrumb.Item key={'list' + item}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        {innerPageList.length > 0 && <Button type="primary" onClick={onBack}>返回{routeInfoReady}</Button>}
                    </div>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    > 
                    {routeInfoReady ? props.children : <LoadingPage/>}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default connect(({auth, page}) => ({auth, page}))(ManagerCenter);
