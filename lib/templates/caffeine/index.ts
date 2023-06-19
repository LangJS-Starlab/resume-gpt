import Handlebars from 'handlebars'
import format from 'date-fns/format';

import template from './resume.html';
import { CV, ResumeTheme } from '@/components/modules/resume';

let handleBarInstance: typeof Handlebars

const formatAddress = (a: any) => {
  const lines = []
  if (a.address) lines.push(a.address)
  if (a.address2) lines.push(a.address2)
  if (a.address3) lines.push(a.address3)
  if (a.city || a.subdivision || a.postalCode) {
    let line = []
    if (a.city) line.push(a.city)
    if (a.subdivision) line.push(a.subdivision)
    if (line.length) {
      line = [line.join(', ')]
    }
    if (a.postalCode) line.push(a.postalCode)
    lines.push(line.join(' '))
  }
  return lines
}

const getHandleInstance = () => {
  if (!handleBarInstance) {
    handleBarInstance = Handlebars.create()

    handleBarInstance.registerHelper({
      removeProtocol: url => {
        return url.replace(/.*?:\/\//g, '')
      },

      concat: (...params) => {
        let res = ''

        for (const arg in params) {
          if (typeof params[arg] !== 'object') {
            res += params[arg]
          }
        }

        return res
      },

      formatAddress: (address, city, region, postalCode, countryCode) => {
        const addressList = formatAddress({
          address: address,
          city: city,
          subdivision: region,
          postalCode: postalCode,
          countryCode: countryCode
        })

        return addressList.join(', ')
      },

      formatDate: date => {
        return format(new Date(date), 'MMM yyyy')
      },

      lowercase: str => {
        return str.toLowerCase()
      },

      is: (s1, s2) => {
        return s1 === s2
      }
    })
  }

  return handleBarInstance
}

export const theme: ResumeTheme = {
  render: (resume: CV) => {
    return getHandleInstance().compile(template)({
      resume: resume
    })
  }
}
