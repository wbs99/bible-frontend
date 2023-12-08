import type { FormEventHandler } from 'react'
import type { AxiosError } from 'axios'
import { Icon } from '../components/Icon'
import { LeftMenu } from '../components/LeftMenu'
import { useMenuStore } from '../stores/menuStore'
import { useCreateBibleStore } from '../stores/createBibleStore'
import type { FormError } from '../lib/validate'
import { hasError, validate } from '../lib/validate'
import { Input } from '../components/Input'
import { useTitle } from '../hooks/useTitle'
import { addBibleApi, getBibleApi } from '../api'
import { CenterDiv } from '../components/CenterDiv'

type Props = {
  title: string
}

export const HomePage = (props: Props) => {
  const { title } = props
  useTitle(title)

  const { visible, setVisible } = useMenuStore()
  const onClick = () => {
    setVisible(!visible)
  }

  const { data, setData, resetData, error, setError } = useCreateBibleStore()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'content', type: 'required', message: '必填' },
      { key: 'volume', type: 'required', message: '必填' },
      { key: 'chapter', type: 'required', message: '必填' },
      { key: 'section', type: 'required', message: '必填' }
    ])
    setError(newError)
    if (!hasError(newError)) {
      await addBibleApi(data).catch(onSubmitError)
      resetData()
      setVisible(false)
    }
  }

  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof data> }>) => {
    setError(err.response?.data?.errors ?? {})
    throw error
  }

  function replacePunctuation(text: string): string {
    const punctuationMapping: { [key: string]: string } = {
      ',': '，',
      '.': '。',
      '!': '！',
      '?': '？',
      ';': '；',
      ':': '：',
      '(': '（',
      ')': '）',
      '[': '【',
      ']': '】',
      '{': '｛',
      '}': '｝',
      '<': '《',
      '>': '》',
      '"': '“',
      '\'': '‘',
      '`': '·',
      '-': '—',
      '_': '＿',
      '=': '＝',
      '+': '＋',
      '|': '｜',
      '\\': '、',
      '/': '／',
      '~': '～',
      '@': '＠',
      '#': '＃',
      '$': '＄',
      '%': '％',
      '^': '＾',
      '&': '＆',
      '*': '＊',
      '—': '——',
      '–': '——',
      '...': '……',
      '..': '……'
    }

    const pattern = /['.,!?;:()\[\]{}<>"'`\-_=+|\\/~@#$%^&*]+/g
    return text.replace(pattern, match => punctuationMapping[match] || '')
  }
  const onContentChange = (content: string) => {
    setData({ content: replacePunctuation(content) })
  }

  const { data: bible, isLoading, error: bibleError } = getBibleApi()
  if (bibleError) {
    return <CenterDiv>数据加载失败，请刷新页面</CenterDiv>
  }
  if (isLoading) {
    return <CenterDiv>loading...</CenterDiv>
  }

  return (
    <div className="p-6 flex flex-col justify-between h-80vh">
      <header>
        <Icon name="logo" className="w-6em h-6em color-#992827" onClick={onClick} />
      </header>
      <main className="rounded-md shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-4">
        {bible
          ? (<>
              <div>
                {bible?.content}
              </div>
              <div className="text-right mt-4">
                ——
                {' '}
                {bible?.volume}
                {' '}
                {bible?.chapter}
                ：
                {bible?.section}
              </div>
            </>)
          : <>暂无数据</>}
      </main>
      <footer className="text-center">
        <button className="p-btn" onClick={() => getBibleApi}>footer</button>
      </footer>
      <LeftMenu visible={visible} onClickMask={() => setVisible(false)}>
        <form className="bg-white h-100% rounded-l-lg p-4" onSubmit={onSubmit}>
          <Input
            type="textarea"
            label="内容"
            placeholder="请输入"
            value={data.content}
            onChange={onContentChange}
            errorMessage={error.content?.[0]}
          />
          <Input
            type="text"
            label="卷"
            placeholder="请输入"
            value={data.volume}
            onChange={volume => setData({ volume })}
            errorMessage={error.volume?.[0]}
          />
          <Input
            type="text"
            label="章"
            placeholder="请输入"
            value={data.chapter}
            onChange={chapter => setData({ chapter: chapter.replace(/[^\d]/g, '') })}
            errorMessage={error.chapter?.[0]}
          />
          <Input
            type="text"
            label="节"
            placeholder="请输入"
            value={data.section}
            onChange={section => setData({ section })}
            errorMessage={error.section?.[0]}
          />
          <button type="submit" className="p-btn">提交</button>
        </form>
      </LeftMenu>
    </div>
  )
}
