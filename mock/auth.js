import qs from 'qs';
import mockjs from 'mockjs';
let userList = [
    {
        key: '1',
        username: 'John Brown',
        userTickname: '2342',
        userId: '1',
        age: 32,
        address: 'New York No. 1 Lake Park',
        roleId: ['00'],
    },
    {
        key: '2',
        username: 'Jim Green',
        userTickname: '2342',
        userId: '2',
        age: 42,
        address: 'London No. 1 Lake Park',
        roleId: ['01'],
    },
    {
        key: '3',
        username: 'Joe Black',
        userTickname: '2342',
        userId: '3',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        roleId: ['01','10'],
    },
    {
        key: '4',
        username: 'Jim Green3',
        userTickname: '2342',
        userId: '4',
        age: 42,
        address: 'London No. 1 Lake Park',
        roleId: ['20'],
    },
    {
        key: '5',
        username: 'Joe Blackt',
        userTickname: '23423',
        userId: '5',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        roleId: ['20'],
    }
];
export default {
    'POST /loginIn' (req, res) {
        let data = qs.parse(req.body);
        res.json({
            code: 0,
            success: true,
            message: '登录成功',
            data: {
                userId: '007',
                username: 'mgp'
            }
        });
    },
    'POST /getRouteInfo' (req, res) {
        res.json({
            code: 0,
            success: true,
            message: '获取路由信息成功',
            data: {
                '/login': {
                    right: true,
                    name: '登陆'
                },
                '/managerCenter/userList': {
                    right: true,
                    name: '用户列表'
                },
                '/managerCenter/userList/userDetail': {
                    right: true,
                    name: '用户详情'
                },
                '/managerCenter/roleList': {
                    right: true,
                    name: '角色列表'
                },
                '/managerCenter/rightList': {
                    right: true,
                    name: '权限列表'
                },
                '/managerCenter/deviceList': {
                    right: true,
                    name: '设备列表'
                },
                '/managerCenter/deviceEventsList': {
                    right: true,
                    name: '设备事件列表'
                }
            }
        });
    },
    'GET /getRoleList' (req, res) {
        let data = qs.parse(req.query);
        res.json({
            code: 0,
            success: true,
            message: '获取成功',
            data: {
                list: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '00',
                        label: '超级管理员'
                    },
                    {
                        value: '01',
                        label: '管理员'
                    },
                    {
                        value: '10',
                        label: '会员'
                    },
                    {
                        value: '20',
                        label: '普通用户'
                    }
                ],
                total: 2
            }
        });
    },
    'POST /getUserList' (req, res) {
        let  data= qs.parse(req.body);
        const { userId, roleId, username } = data;
        const filterList = userList.filter(item => {
            if (userId) {
                if(userId !== item.userId) {
                    return false;
                }
            }
            if (roleId) {
                if(!item.roleId.includes(roleId)) {
                    return false;
                }
            }
            if (username) {
                if(username !== item.username) {
                    return false;
                }
            }
            return true;
        })
        res.json({
            code: 0,
            success: true,
            message: '获取成功',
            data: {
                list: filterList,
                page: 1,
                size: 10,
                total: 6
            }
        });
    },
    'GET /deleteUser' (req, res) {
        let data = qs.parse(req.query);
        userList = userList.filter(item => {
            return item.userId !== data.userId
        })
        res.json({
            code: 0,
            success: true,
            message: '删除成功',
            data: {
               userId: data.userId
            }
        });
    },
    'GET /getUserDetailById' (req, res) {
        let data = qs.parse(req.query);
        let arr = userList.filter(item => item.userId == data.userId);
        res.json({
            code: 0,
            success: true,
            message: '获取成功',
            data: arr[0]
        });
    },
    'POST /loginIn' (req, res) {
        let data = qs.parse(req.body);
        console.log('接口获取', data.url, data);
        for(const o of userList) {
            if (o.userId == data.userId) {
                o.username = data.username;
                o.userTickname = data.userTickname;
                break;
            }
        }
        res.json({
            code: 0,
            success: true,
            message: '获取成功',
            data: null
        });
    },
    'GET /addUser' (req, res) {
        let data = qs.parse(req.query);
        userList.push({
            key: '6',
            username: data.username,
            userTickname:  data.userTickname,
            userId: '6',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            roleId: ['20'],
        });
        res.json({
            code: 0,
            success: true,
            message: '添加成功',
            data: null
        });
    },
}
