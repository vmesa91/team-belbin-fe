

const paths = ( root, sublink ) => `${root}${sublink}`

const ROOT_AUTH = '/auth'
const ROOT_HOME = '/home'
const ROOT_PROFILE = '/profile'
const ROOT_MEMBER = '/member'
const ROOT_TEAM = '/team'
const ROOT_DATA = '/data'
const ROOT_ACCOUNT = '/user'

// --------------------------  AUTH  --------------------------

export const PATH_AUTH = {
    root: ROOT_AUTH,
    login: paths(ROOT_AUTH, '/login'),
    register: paths(ROOT_AUTH, '/register')
}


// --------------------------  HOME  --------------------------

export const PATH_HOME = {
    root: ROOT_HOME,
    dashboard: paths(ROOT_HOME, '/dashboard')
}


// --------------------------  PROFILES  --------------------------

export const PATH_PROFILE = {
    root: ROOT_PROFILE,
    createProfile: paths(ROOT_PROFILE, '/createProfile'),
    editProfile: (id) => paths(ROOT_PROFILE, `/editProfile/${id}`),
    manageProfiles: paths(ROOT_PROFILE, '/tableProfiles')
}


// --------------------------  MEMBERS  --------------------------

export const PATH_MEMBER = {
    root: ROOT_MEMBER,
    createMember: paths(ROOT_MEMBER, '/createMember'),
    editMember: (id) => paths(ROOT_MEMBER, `/editMember/${id}`),
    manageMembers: paths(ROOT_MEMBER, '/tableMembers')
}


// --------------------------  TEAMS  --------------------------

export const PATH_TEAM = {
    root: ROOT_TEAM,
    createTeam: paths(ROOT_TEAM, '/createTeam'),
    configTeam: paths(ROOT_TEAM, '/configTeam'),
    summaryTeam: paths(ROOT_TEAM, '/summaryTeam'),
    manageTeams: paths(ROOT_TEAM, '/tableTeams')
}


// --------------------------  DATA  --------------------------

export const PATH_DATA = {
    root: ROOT_DATA,
    createDats: paths(ROOT_DATA, '/createData')
}