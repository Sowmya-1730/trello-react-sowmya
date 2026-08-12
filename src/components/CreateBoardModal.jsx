import { Button, Form, Input, Modal } from 'antd'

function CreateBoardModal({ open, onCancel, onCreate, loading }) {
  const [form] = Form.useForm()

  const handleFinish = async (values) => {
    await onCreate(values.name)
    form.resetFields()
  }

  return (
    <Modal
      title="Create Board"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Board Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a board name',
            },
          ]}
        >
          <Input placeholder="Enter board name" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateBoardModal