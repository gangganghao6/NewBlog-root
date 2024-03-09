export default function sliceEmail(email = '') {
    return (
      email.slice(0, email.indexOf('@')-3) +
      '***' +
      email.slice(email.indexOf('@'))
    )
  }
  