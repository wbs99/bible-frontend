import { useNavigate } from "react-router-dom"
import { Icon } from "../components/Icon"
import { LeftMenu } from "../components/LeftMenu"
import { useMenuStore } from "../stores/menuStore"
import { useCreateBibleStore } from "../stores/createBibleStore"
import { FormEventHandler } from "react"
import { hasError, validate } from "../lib/validate"
import { Input } from "../components/Input"

type Props = {
  title: string
}

export const HomePage = (props: Props) => {
  const nav = useNavigate()
  const { visible, setVisible } = useMenuStore()
  const onClick = () => {
    setVisible(!visible)
  }

  const { data, setData, error, setError } = useCreateBibleStore()
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'content', type: 'required', message: '必填' },
      { key: 'volume', type: 'required', message: '必填' },
      { key: 'chapter', type: 'required', message: '必填' },
      { key: 'section', type: 'required', message: '必填' }
    ])
    setError(newError)
    if (!hasError(newError)) {
      console.log(data)
      // const response = await loginApi(loginForm).catch(onSubmitError)
    }
  }

  return (
    <div className="p-6 flex flex-col justify-between h-80vh">
      <header>
        <Icon name='logo' className="w-6em h-6em color-#992827" onClick={onClick} />
      </header>
      <main className="rounded-md shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-4">
        <div>
          这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字
        </div>
        <div className="text-right mt-4">
          —— 出处出处出处出处
        </div>
      </main>
      <footer className="text-center">
        <button className="p-btn">footer</button>
      </footer>
      <LeftMenu visible={visible} onClickMask={() => setVisible(false)}>
        <form className="bg-white h-100% rounded-l-lg p-4" onSubmit={onSubmit}>
          <Input type='textarea' label="内容" placeholder="请输入" value={data.content}
            onChange={content => setData({ content })} errorMessage={error.content?.[0]} />
          <Input type='text' label="卷" placeholder="请输入" value={data.volume}
            onChange={volume => setData({ volume })} errorMessage={error.volume?.[0]} />
          <Input type='text' label="章" placeholder="请输入" value={data.chapter}
            onChange={chapter => setData({ chapter: chapter.replace(/[^\d]/g, '') })} errorMessage={error.chapter?.[0]} />
          <Input type='text' label="节" placeholder="请输入" value={data.section}
            onChange={section => setData({ section: section.replace(/[^\d]/g, '') })} errorMessage={error.section?.[0]} />
          <button type='submit' className="p-btn">提交</button>
        </form>
      </LeftMenu>
    </div>
  )
}
