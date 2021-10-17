import { ContentType, GenderType, LanguageCode, StatusGlobal, VisiblePost } from 'models/enum';
import { ControlType } from 'models/form';

export const ConvertType = (typeEnum: ControlType) => {
  switch (typeEnum) {
    case ControlType.Date:
      return 'date';
    case ControlType.Attachment:
      return 'file';
    case ControlType.Toggle:
      return 'radio';
    case ControlType.Password:
      return 'password';
    case ControlType.Choice:
      return 'checkbox';
    case ControlType.Number:
      return 'number';
    default:
      return 'text';
  }
};

export const RenderSymbol = {
  NEXT: '&rsaquo;',
  NEXT_END: '&raquo;',
  PREVIOUS: '&lsaquo;',
  LAST_PREVIOUS: '&laquo;',
};
export interface IOption {
  key?: number | string;
  text?: string;
}

export const VisibleOptions: IOption[] = [
  {
    key: VisiblePost.Public,
    text: 'Public',
  },
  {
    key: VisiblePost.Private,
    text: 'Private',
  },
];

export const ContentTypeOptions: IOption[] = [
  {
    key: ContentType.Text,
    text: 'Text',
  },
  {
    key: ContentType.Image,
    text: 'Image',
  },
  {
    key: ContentType.Video,
    text: 'Video',
  },
  {
    key: ContentType.Multi,
    text: 'Multi',
  },
];

export const StatusGlobalOption: IOption[] = [
  {
    key: StatusGlobal.Draft,
    text: 'Draft',
  },
  {
    key: StatusGlobal.Public,
    text: 'Public',
  },
  {
    key: StatusGlobal.Hide,
    text: 'Hide',
  },
];

export const GenderOptions: IOption[] = [
  {
    key: GenderType.Male,
    text: 'Male',
  },
  {
    key: GenderType.Female,
    text: 'Female',
  },
  {
    key: GenderType.Other,
    text: 'Other',
  },
];

export const LanguageOptions: IOption[] = [
  {
    key: LanguageCode.EN,
    text: 'English',
  },
  {
    key: LanguageCode.FR,
    text: 'French',
  },
];

const OptionMirror = class {
  RenderDate(key?: Date | any) {
    return key
      ? key.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '';
  }

  VisiblePost(key: string | number | 0) {
    let option = VisibleOptions.find(e => e.key === key);
    return option ? option.text : '';
  }

  ContentType(key: string | number) {
    let option = ContentTypeOptions.find(e => e.key === key);
    return option ? option.text : '';
  }

  Status(key: string | number) {
    let option = StatusGlobalOption.find(e => e.key === key);
    return option ? option.text : '';
  }

  Gender(key: string | number | undefined) {
    let option = GenderOptions.find(e => e.key === key);
    return option ? option.text : '';
  }
  // format số 1000000 => 1,000,000
  FormatComa(n: number) {
    return n && n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // format số 1000000 => 1.000.000
  FormatDot(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  FormatDateInput(n: string) {
    if (n.match(/^\d{2}$/) !== null) {
      return n + '/';
    } else if (n.match(/^\d{2}\/\d{2}$/) !== null) {
      return n + '/';
    } else return n;
  }

  CheckImageUrl(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) !== null;
  }

  ShortedTitle(text: string, maxWord: number) {
    const splitText = text?.split(' ');
    if (splitText?.length === 1) return splitText[0].slice(0, 20) + '...';
    return splitText?.length > maxWord ? splitText.slice(0, maxWord).join(' ') + '...' : text;
  }

  I18nFieldError(input?: string, replace?: string) {
    let inputText = input ?? '';
    let replaceText = replace ?? '';

    return inputText.replace('{0}', replaceText);
  }
};
const optionMirror = new OptionMirror();

export { optionMirror };
