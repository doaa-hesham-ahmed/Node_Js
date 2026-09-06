const { prisma } = require("./../../common/db/db");

const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    });
};

const checkUserExistById = async (id) => {

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });

    return !!user;
};

const createUser = async (name, email, password) => {
   const user = await prisma.user.create({
       data:{
        name,
        email,
        password
       },
    //    omit : {
    //     email:true,
    //     password:true
    // }
    })
    // return user;
};

const updateUser = async (id, name, email, password) => {

    const updated = await prisma.user.upsert({
        where: {
            id: Number(id)
        },

        update: {
            name,
            email,
            password
        },

        create: {
            id: Number(id),
            name,
            email,
            password
        },

        omit: {
            password: true,
            role: true
        }
    });

    return updated;
};

const findUserid = async(id)=>{
    const userexist = await prisma.user.findUnique({
        where:{
            id:Number(id)
        },
        omit:{
            password:true,
            email:true
        }
    })
    return userexist;
}
const findUseremail = async(email)=>{
    const userexist = await prisma.user.findUnique({
        where:{
          email:email
        },
        omit:{
            password:true,
            email:true
        }
    })
    return userexist;
}

const deleteHardUser = async (id) => {

    return await prisma.user.delete({
        where: {
            id: Number(id)
        },
        omit: {
            password: true
        }
    });
};

const deleteSoftUser = async (id) => {

    return await prisma.user.update({
        where: {
            id: Number(id)
        },
        data:{
             isDeleted: true
        }
    });
};

module.exports = {
    findUserByEmail,
    createUser,
    updateUser,
    checkUserExistById,
    findUserid,
    findUseremail,
    deleteHardUser,
    deleteSoftUser 
};