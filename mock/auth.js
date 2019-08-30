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
    }
}
