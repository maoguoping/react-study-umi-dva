import React, {useState, useEffect} from 'react'
import './style.scss'
import { Layout, Breadcrumb, PageHeader, Button, Icon } from 'antd'
import HeadBar from '../../components/module/headerBar'
import SideMenu from '../../components/module/sideMenu'
import router from 'umi/router';
import { connect } from 'dva';
const { Content, Sider } = Layout;
function ManagerCenter (props) {
    const { dispatch, auth, page } = props;
    const defaultValue = ['sub1','child1'];
    const [selectValue, setSelectValue] = useState(['sub1','child1']);
    const [pathNameList, setPathNameList] = useState([]);
    const headerMenuList = page.headerMenuList;
    const sideMenuList = page.sideMenuList;
    const innerPageList = page.innerPageList;
    useEffect(() => {
        console.debug('页面信息', page)
        let arr = [page.currentHeader.label];
        page.currentSide.forEach(item => {
            arr.push(item.label);
        });
        setPathNameList(arr);
        console.debug(pathNameList);
    }, [page, page.currentHeader, page.currentSide, pathNameList]);
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
                            {pathNameList.map(item => <Breadcrumb.Item key={'list' + item}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        {innerPageList.length > 0 && <Button type="primary" onClick={onBack}>返回</Button>}
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
export default connect(({auth, page}) => ({auth, page}))(ManagerCenter);
