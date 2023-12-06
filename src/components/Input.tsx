import type { ChangeEvent, ReactNode } from 'react'

type Props<T> = {
  label?: string | ReactNode
  placeholder?: string
  value?: T
  onChange?: (value: T) => void
  errorMessage?: string
  disableError?: boolean // 是否需要显示 error
  className?: string
} & (
  | { type?: 'text' }
  | { type: 'textarea' }
  | { type: 'select', options: { value: string, text: string }[] }
  )
export const Input = <T extends string>(props: Props<T>) => {
  const { label, placeholder, value, onChange: _onChange, errorMessage, disableError, className } = props
  const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = typeof e === 'string' ? e : e.target.value
    _onChange?.(value as T)
  }
  const common = { value, onChange, placeholder }

  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input className="p-input-text" type="text" {...common} />
      case 'textarea':
        return <textarea className="pl-16px py-8px border text-gray-700 text-18px rounded-8px appearance-none resize-none rounded-md" rows={5} cols={35} {...common} />
      case 'select':
        return (
          <select className="h-36px" {...common}>
            {props.options.map(option =>
              <option key={option.value} value={option.value}>{option.text}</option>)}
          </select>
        )
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px className={className}>
      {label ? <span text-18px>{label}</span> : null}
      {renderInput()}
      {disableError ? null : <span text-red text-12px>{errorMessage || '　'}</span>}
    </div>
  )
}
