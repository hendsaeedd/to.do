const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require('../../controllers/user')

const User = require('../../models/user')

jest.mock('../../models/user')

function createMockNewUser(username, password, firstname) {
  return { id: 1, username, password, firstname }
}

//test register
describe('registerUser function', () => {
  it('should register a new user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
        firstname: 'test',
      },
    }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const mockNewUser = createMockNewUser({
      username: 'testuser',
      password: 'testpassword',
      firstname: 'test',
    })
    User.create = jest.fn().mockResolvedValue(mockNewUser)

    await registerUser(req, res)

    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
      firstName: 'test',
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User was registered successfully',
      newUser: mockNewUser,
    })
  })
})

//test login
describe('loginUser function', () => {
  it('should log in a user', async () => {
    const req = { body: { username: 'testuser', password: 'testpassword' } }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const loginUserMock = { username: 'testuser', password: 'testpassword' }
    User.mockReturnValue(loginUserMock)

    await loginUser(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User was logged in successfully',
      loginUser: loginUserMock,
    })
  })

  it('should handle login error', async () => {
    const req = { body: { username: 'testuser', password: 'testpassword' } }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const errorMessage = 'Invalid credentials'
    User.mockRejectedValue(new Error(errorMessage))

    await loginUser(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(errorMessage)
  })
})

//test getallusers
describe('getAllUsers function', () => {
  it("should get all users' first names", async () => {
    const req = {}
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const usersMock = [{ firstName: 'Hend' }, { firstName: 'Hana' }]
    User.find.mockResolvedValue(usersMock)

    await getAllUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(usersMock)
  })

  it('should handle get all users error', async () => {
    const req = {}
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const errorMessage = 'Failed to get users'
    User.find.mockRejectedValue(new Error(errorMessage))

    await getAllUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
  })
})

//test delete
describe('deleteUser function', () => {
  it('should delete a user', async () => {
    const req = { params: { name: 'testuser' } }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const deletedUserMock = { deletedCount: 1 }
    User.deleteOne.mockResolvedValue(deletedUserMock)

    await deleteUser(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User deleted successfully',
      deletedUser: deletedUserMock,
    })
  })

  it('should handle delete user error', async () => {
    const req = { params: { name: 'testuser' } }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const errorMessage = 'Failed to delete user'
    User.deleteOne.mockRejectedValue(new Error(errorMessage))

    await deleteUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
  })
})

//test update
describe('updateUser function', () => {
  it('should update a user', async () => {
    const req = {
      params: { name: 'testuser' },
      body: { firstName: 'UpdatedName' },
    }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const userUpdateMock = { nModified: 1 }
    User.updateOne.mockResolvedValue(userUpdateMock)

    await updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(userUpdateMock)
  })

  it('should handle update user error', async () => {
    const req = {
      params: { name: 'testuser' },
      body: { firstName: 'UpdatedName' },
    }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const errorMessage = 'Failed to update user'
    User.updateOne.mockRejectedValue(new Error(errorMessage))

    await updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(errorMessage)
  })
})
