import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  SectionList,
  VirtualizedList
} from 'react-native';
import React from 'react'
import { colors, fontSizes } from '../../styles/defaults';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';


type ItemProps = {
  title: string;
  icon: string;
};

const Item = ({title, icon}: ItemProps) => (
  <View style={styles.item}>
    <SvgXml xml={icon} width={24} height={24} fill={colors.textBlack} />
    <Text style={styles.itemText}>{title}</Text>
  </View>
);


const Profile = () => {
  
  //Test
  const name: string = useSelector((state:any) => (state.userReducer.user.firstName + ' ' + state.userReducer.user.lastName));
  const phone: string = useSelector((state:any) => (state.userReducer.user.phone));
  const countryCode: string = useSelector((state:any) => (state.userReducer.user.countryCode));

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.nameArea}>{name}</Text>
      <Text style={styles.phoneArea}>{'+' + countryCode + phone}</Text>
      <Item title='Payment' icon={xmls.payment}/>
      <Item title='Promo codes' icon={xmls.promoCodes}/>
      <Item title='Profile' icon={xmls.profile}/>
      <Item title='Settings' icon={xmls.settings}/>
      <Item title='About' icon={xmls.about}/>
      <Item title='Help' icon={xmls.help}/>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginBottom: 24
  },

  container: {
  },

  nameArea: {
    flex: 0,
    fontSize: fontSizes.xxl,
    color: colors.quaternary,
    fontWeight: '800'
  },

  phoneArea: {
    flex: 0,
    fontSize: fontSizes.l,
    color: colors.quaternary,
    fontWeight: '400',
    paddingBottom: 32
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32, 
  },

  itemText: {
    flex: 0,
    fontSize: fontSizes.xl,
    color: colors.textBlack,
    fontWeight: '500'
  }
})

const xmls = {
  payment: `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 -0.8 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`,
  promoCodes: `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve"> <g><path d="M66.318,7.585c-0.045-0.905-0.705-1.675-1.601-1.856c-0.077-0.015-0.153-0.026-0.229-0.033L38.635,3.139 c-0.601-0.06-1.187,0.152-1.611,0.576L6.55,34.191c-4.571,4.571-4.571,7.359,0,11.929l19.338,19.34 c2.049,2.05,3.847,3.412,5.965,3.412s3.916-1.366,5.961-3.413l30.479-30.478c0.424-0.423,0.635-1.014,0.576-1.611L66.318,7.585z M34.987,62.631c-0.961,0.961-2.332,2.24-3.134,2.24c-0.803,0-2.175-1.279-3.137-2.24L9.378,43.291 c-2.989-2.988-2.989-3.283,0-6.271L39.186,7.212l23.303,2.306l2.308,23.304L34.987,62.631z"/><path d="M50.604,12.862c-4.571,0-8.293,3.72-8.293,8.292c0,4.572,3.722,8.292,8.293,8.292c4.573,0,8.291-3.72,8.291-8.292 C58.895,16.582,55.176,12.862,50.604,12.862z M50.604,25.446c-2.367,0-4.293-1.926-4.293-4.292c0-2.366,1.926-4.292,4.293-4.292 c2.369,0,4.291,1.926,4.291,4.292C54.895,23.52,52.971,25.446,50.604,25.446z"/></g></svg>`,
  profile: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="style=stroke">
  <g id="profile">
  <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C9.92893 2.75 8.25 4.42893 8.25 6.5C8.25 8.57107 9.92893 10.25 12 10.25C14.0711 10.25 15.75 8.57107 15.75 6.5C15.75 4.42893 14.0711 2.75 12 2.75ZM6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#000000"/>
  <path id="rec (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714ZM9.57143 14.75C7.46091 14.75 5.75 16.4609 5.75 18.5714C5.75 20.0508 6.94924 21.25 8.42857 21.25H15.5714C17.0508 21.25 18.25 20.0508 18.25 18.5714C18.25 16.4609 16.5391 14.75 14.4286 14.75H9.57143Z" fill="#000000"/>
  </g>
  </g>
  </svg>`,
  settings: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a1 1 0 0 0-1 1c0 1.692-2.046 2.54-3.243 1.343a1 1 0 1 0-1.414 1.414C7.54 8.954 6.693 11 5 11a1 1 0 1 0 0 2c1.692 0 2.54 2.046 1.343 3.243a1 1 0 0 0 1.414 1.414C8.954 16.46 11 17.307 11 19a1 1 0 1 0 2 0c0-1.692 2.046-2.54 3.243-1.343a1 1 0 1 0 1.414-1.414C16.46 15.046 17.307 13 19 13a1 1 0 1 0 0-2c-1.692 0-2.54-2.046-1.343-3.243a1 1 0 0 0-1.414-1.414C15.046 7.54 13 6.693 13 5a1 1 0 0 0-1-1zm-2.992.777a3 3 0 0 1 5.984 0 3 3 0 0 1 4.23 4.231 3 3 0 0 1 .001 5.984 3 3 0 0 1-4.231 4.23 3 3 0 0 1-5.984 0 3 3 0 0 1-4.231-4.23 3 3 0 0 1 0-5.984 3 3 0 0 1 4.231-4.231z" fill="#0D0D0D"/><path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2.828-.828a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656z" fill="#0D0D0D"/></svg>`,
  about: `<svg width="800px" height="800px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>about</title>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
          <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape">

</path>
      </g>
  </g>
</svg>`,
  help: `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M12,6 C14.209139,6 16,7.790861 16,10 C16,11.7948083 14.8179062,13.3135239 13.1897963,13.8200688 L13,13.8739825 L13,14 C13,14.5522847 12.5522847,15 12,15 C11.4871642,15 11.0644928,14.6139598 11.0067277,14.1166211 L11,14 L11,13 C11,12.4871642 11.3860402,12.0644928 11.8833789,12.0067277 L12.1492623,11.9945143 C13.1841222,11.9181651 14,11.0543618 14,10 C14,8.8954305 13.1045695,8 12,8 C10.8954305,8 10,8.8954305 10,10 C10,10.5522847 9.55228475,11 9,11 C8.44771525,11 8,10.5522847 8,10 C8,7.790861 9.790861,6 12,6 Z"/>
</svg>`
}

export default Profile
