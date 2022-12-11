import dynamic  from 'next/dynamic'

const ShareEditor = dynamic(
  () => import('containers/Editor/ShareEditor'),
  {ssr: false}
)

export default function Editor() {

  return <ShareEditor />
}
