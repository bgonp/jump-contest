const getEditUserUrl = (clubId: number): string =>
  `http://madrid.clubtres60.com/wp-admin/post.php?post=${clubId}&action=edit`

export default getEditUserUrl
