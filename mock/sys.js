function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

const allAuth = [
  {
    action: "eduTeam:eduApply:admin",
    describe: "管理员",
    type: "1",
  },
  {
    action: "user:form:phone",
    describe: "手机号禁用",
    type: "2",
  },
  {
    action: "user:add",
    describe: "添加用户按钮",
    type: "1",
  }
]
const auth = [
  {
    action: "user:add",
    describe: "添加用户按钮",
    type: "1"
  }
]
const menuList = [
  {
    path: "/home",
    meta: {
      icon: "home",
      title: "首页"
    },
    name: "home",
    id: "9502685863ab87f0ad1134142788a385"
  },
  {
    path: "/system",
    meta: {
      icon: "setting",
      title: "系统管理"
    },
    name: "system",
    id: "d7d6e2e4e2934f2c9385a623fd98c6f3",
    children: [
      {
        path: "/system/user",
        meta: {
          title: "用户管理"
        },
        name: "systemUser",
        id: "3f915b2769fc80648e92d04e84ca059d"
      },
      {
        path: "/system/role",
        meta: {
          title: "角色管理"
        },
        name: "systemRole",
        id: "190c2b43bec6a5f7a4194a85db67d96a"
      },
      {
        path: "/system/menu",
        meta: {
          title: "菜单管理"
        },
        name: "systemMenu",
        id: "54dd5457a3190740005c1bfec55b1c34"
      },
      {
        path: "/system/depart",
        meta: {
          title: "部门管理"
        },
        name: "systemDepart",
        id: "45c966826eeff4c99b8f8ebfe74511fc"
      },
      {
        path: "/system/dict",
        meta: {
          title: "字典管理"
        },
        name: "systemDict",
        id: "f1cb187abf927c88b89470d08615f5ac"
      },
    ],
  }
]

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/sysLogin': {
    status: 200,
    timestamp: new Date() * 1,
    message: 'success',
    data: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTU5Njk5OTYsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQVa8sMSLU-2pu5XmdQ2VFr9i3o9HTWLKgxp2DSZ-l4",
      userInfo: {
        "id": "e9ca23d68d884d4ebb19d07889727dae",
        "username": "admin",
        "realname": "管理员",
        "avatar": "temp/avatar2_1601294345772.jpg",
        "birthday": "2018-12-05",
        "sex": 2,
        "email": "jeecg@163.com",
        "phone": "18611111111",
        "orgCode": "A04",
        "status": 1,
        "delFlag": 0,
        "workNo": "00001",
        "post": "7",
        "telephone": null,
        "createBy": null,
        "createTime": "2038-06-21 17:54:10",
        "updateBy": "admin",
        "updateTime": "2021-02-02 14:13:34",
        "activitiSync": 1,
        "userIdentity": 2,
        "departIds": "ad0bae1fccab487e80cf09cdda4bd836",
        "securityGrade": "0",
        "thirdId": null,
        "thirdType": null
      },
    }
  },
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
  },

  'GET /api/getUserPermissionByToken': (req, res) => {
    // const { password, userName, type } = req.body;
    res.status(200).send({
      status: 200,
      timestamp: new Date() * 1,
      message: 'success',
      data: {
        allAuth,
        auth,
        menu: menuList
      },
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
