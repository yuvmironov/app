export function EditorConfiguration () {
  const tinyInitConfig = {
    width: '100%',
    height: `${document.body.clientHeight - 400}px`,
    plugins: 'advlist autolink lists link image charmap print preview emoticons' +
      ' insertdatetime preview anchor searchreplace visualblocks code fullscreen' +
      ' insertdatetime media table paste imagetools wordcount',
    toolbar: `
        insertfile undo redo |
        styleselect |
        bold italic |
        alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent table|
        link image insertdatetime |
        fullscreen`,
    id: 'mailing',
    'model-events': 'change keydown blur focus paste'
  }

  return {
    tinyInitConfig
  }
}
