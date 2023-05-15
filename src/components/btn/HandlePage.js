const HandlePage = ({error , NextPage , PrevPage}) => {
  return (
    <>
      <div className='btn'>
        {error ? <p>最初のページだよ〜</p> : <></>}
        
        <button onClick={PrevPage}>前へ</button>
        <button onClick={NextPage}>次へ</button>
      </div>
    </>
  )
}

export default HandlePage;