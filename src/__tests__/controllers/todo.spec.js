const {
  createTodo,
  getTodoWithID,
  updateTodo,
  deleteTodo,
} = require('../../controllers/todo')

const User = require('../../models/user')
const Todo = require('../../models/todo')

jest.mock('../../models/user')
jest.mock('../../models/todo')

function createMockUser(username) {
  return { _id: '1', username }
}

function createMockTodo(userId, title, tags) {
  return { _id: 'u1', userId, title, tags }
}

describe('createTodo function', () => {
  it('should create a new todo', async () => {
    const req = {
      body: {
        username: 'testuser',
        title: 'Test Todo',
        tags: ['tag1', 'tag2'],
      },
    }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const userMock = createMockUser('testuser')
    const todoMock = createMockTodo(userMock._id, 'Test Todo', ['tag1', 'tag2'])
    User.findOne.mockResolvedValue(userMock)
    Todo.create.mockResolvedValue(todoMock)

    await createTodo(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' })
    expect(Todo.create).toHaveBeenCalledWith({
      userId: userMock._id,
      title: 'Test Todo',
      tags: ['tag1', 'tag2'],
    })
    expect(res.json).toHaveBeenCalledWith(todoMock)
  })

  it('should handle error', async () => {
    const req = {
      body: {
        username: 'testuser',
        title: 'Test Todo',
        tags: ['tag1', 'tag2'],
      },
    }
    const res = { json: jest.fn() }
    const errorMessage = 'Internal server error'
    User.findOne.mockRejectedValue(new Error(errorMessage))

    await createTodo(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
  })
})

describe('getTodoWithID function', () => {
  it('should get todos by user ID', async () => {
    const req = { params: { userId: '1' } }
    const res = { json: jest.fn() }
    const todosMock = [
      {
        _id: 'u1',
        userId: '1',
        title: 'Test Todo',
        tags: ['tag1', 'tag2'],
      },
    ]
    Todo.find.mockResolvedValue(todosMock)

    await getTodoWithID(req, res)

    expect(Todo.find).toHaveBeenCalledWith({ userId: '1' })
    expect(res.json).toHaveBeenCalledWith(todosMock)
  })

  it('should handle error', async () => {
    const req = { params: { userId: '1' } }
    const res = { json: jest.fn() }
    const errorMessage = 'Internal server error'
    Todo.find.mockRejectedValue(new Error(errorMessage))

    await getTodoWithID(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
  })
})

describe('updateTodo function', () => {
  it('should update a todo', async () => {
    const req = {
      params: { id: 'u1' },
      body: { title: 'Updated Todo', tags: ['tag3', 'tag4'] },
    }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const updateMock = { nModified: 1 }
    Todo.updateOne.mockResolvedValue(updateMock)

    await updateTodo(req, res)

    expect(Todo.updateOne).toHaveBeenCalledWith(
      { _id: 'u1' },
      { title: 'Updated Todo', tags: ['tag3', 'tag4'] }
    )
    expect(res.json).toHaveBeenCalledWith({
      message: 'Todo updated successfully',
      updatedTodo: updateMock,
    })
  })

  it('should handle error', async () => {
    const req = {
      params: { id: 'u1' },
      body: { title: 'Updated Todo', tags: ['tag3', 'tag4'] },
    }
    const res = { json: jest.fn() }
    const errorMessage = 'Internal server error'
    Todo.updateOne.mockRejectedValue(new Error(errorMessage))

    await updateTodo(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
  })
})

describe('deleteTodo function', () => {
  it('should delete a todo', async () => {
    const req = { params: { id: 'u1' } }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const deletedTodoMock = { deletedCount: 1 }
    Todo.deleteOne.mockResolvedValue(deletedTodoMock)

    await deleteTodo(req, res)

    expect(Todo.deleteOne).toHaveBeenCalledWith({ _id: 'u1' })
    expect(res.json).toHaveBeenCalledWith({
      message: 'Todo deleted successfully',
    })
  })

  it('should handle todo not found error', async () => {
    const req = { params: { id: 'u1' } }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const deletedTodoMock = { deletedCount: 0 }
    Todo.deleteOne.mockResolvedValue(deletedTodoMock)

    await deleteTodo(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Todo not found' })
  })

  it('should handle error', async () => {
    const req = { params: { id: 'u1' } }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const errorMessage = 'Internal server error'
    Todo.deleteOne.mockRejectedValue(new Error(errorMessage))

    await deleteTodo(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
  })
})
