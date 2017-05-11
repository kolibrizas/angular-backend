

/**
 * ---------------- New Strict Interfaces ------------------------------
 * 
 * @warning Use interfaces below !!
 * @warning All the interfaces above are DEPRECATED !!
 * 
 * -----------------------------------------------------------------
 * 
 * 
 * Naming rules
 * 
 *      begin with '_'
 *      optioanl param has '_O' or else it's not otioanl.
 *      interface that has field attr for extending purpose has '_I' and it shouldn't be exported.
 * 
 */

export type NUMBERS = Array<number>;

export interface _IDX {
    idx: number;
}

export interface _IDX_O {
    idx?: number;
}

export interface _ROOT_IDX {
    root_idx: number;
}
export interface _PARENT_IDX {
    parent_idx: number;
}

export interface _ID { id: string; };
export interface _ID_O { id?: string; };


export interface _PASSWORD {
    password: string;
}
export interface _PASSWORD_O {
    password?: string;
};


export interface _CONTENT {
    content: string;
}
export interface _CONTENT_O {
    content?: string;
}

export interface _REQUEST_O {
    route?: string;
    session_id?: string;
};
export interface _RESPONSE {
    readonly code: number;
    readonly message?: string;
};



export interface _META {
    [key: string] : string;
}

export type _META_ARRAY = Array<_META>;


export interface _METAS {
    meta?: _META_ARRAY;
};





//// global

export interface _LIST extends _REQUEST_O {
    select?: string;
    from?: number;
    where?: string;
    bind?: string;
    order?: string;
    limit?: number;
    extra?: any;
    page?: number;
};

export interface _DATA_REQUEST extends _REQUEST_O, _IDX_O, _ID_O {};



export interface _DELETE_REQUEST extends _REQUEST_O, _IDX_O, _ID_O {}; // universal. all kinds of delete requst.
export interface _DELETE_RESPONSE extends _RESPONSE {
    data: {
        idx?: number;
        id?: string;
    }
}; // universal. all kinds of delete response.





////////////////////////////////
//////////////////////////////// User Interfaces
////////////////////////////////
/// User response data after crud.
export interface _USER_CRUD_FIELDS {
    session_id: string;
    id: string;
    idx: number;
    name: string;
    email: string;
    admin?: number;
}

export interface _USER_CRUD_DATA {
    data: _USER_CRUD_FIELDS;
}

export interface _SESSION_INFO extends _USER_CRUD_FIELDS {};


export interface _USER_CRUD_RESPONSE extends _RESPONSE, _USER_CRUD_DATA {};
export type _USER_SESSION_RESPONSE = _USER_CRUD_RESPONSE;




export interface _USER_LOGIN extends _REQUEST_O, _ID, _PASSWORD {};        // to login
export type _USER_LOGIN_RESPONSE = _USER_SESSION_RESPONSE;              // to get response of USER_LOGIN




export interface _USER_PASSWORD_CHANGE extends
    _REQUEST_O {
        old_password: string;
        new_password: string;
    };
export type _USER_PASSWORD_CHANGE_RESPONSE = _USER_SESSION_RESPONSE;              // to get response of password change



export interface _USER_LIST_RESPONSE extends _RESPONSE {                       // array of users for user.list request
    data: {
        users: Array<_USER_RESPONSE>
        total?: string;
        limit?: string;
        page?: string;
    }
};



//// file upload


export interface _FILE_HOOKS {
    file_hooks?: NUMBERS;
};




export interface _FILE {
    idx: number;
    model: string;
    model_idx: number;
    code: string;
    name: string;
    type: string;
    size: number;
    no_of_download: number;
    url: string;
};


export interface _FILES {
    files?: Array<_FILE>;
}




export interface _UPLOAD extends _REQUEST_O {
    model?: string;
    model_idx?: number;
    code?: string;
    unique?: string;
    finish?: string;
};

// export type _UPLOAD = UPLOAD;

export interface _UPLOAD_RESPONSE extends _RESPONSE {
    data: _FILE;
};

//export type _UPLOAD_RESPONSE = UPLOAD_RESPONSE;
//export interface _UPLOAD_RESPONSE extends UPLOAD_RESPONSE {};

export interface _IMG_SRC {
    idx: number;
    width?: number;
    height?: number;
    quality?: number;
    resize?: '' | 'crop'
}



/**
 * User primary photo interfaces
 * 
 * @note this is a special declaration for user primary phto upload since it needs more care.
 * 
 */
export interface _ANONYMOUS_PRIMARY_PHOTO_UPLOAD extends _REQUEST_O {
    model: 'user';
    code: 'primary_photo';
}
export interface _PRIMARY_PHOTO_UPLOAD extends _ANONYMOUS_PRIMARY_PHOTO_UPLOAD {
    model_idx: number;
    unique: 'Y';
    finish: 'Y';
}

export interface _PRIMARY_PHOTO {
    primary_photo: _FILE;
}



export interface _VOTE_RESPONSE extends _RESPONSE {
    data: {
        readonly idx: number;
        readonly vote_good: number;
        readonly vote_bad: number;
    }
}

export interface _REPORT_RESPONSE extends _RESPONSE {
    data: {
        readonly report: number;
    }
}


/**
 * user common fields for crud.
 */
export interface _USER_COMMON_FIELDS {
    name?: string;
    nickname?: string;
    email?: string;
    mobile?: string;
    landline?: string;
    gender?: string;
    birth_day?: string;
    birth_month?: string;
    birth_year?: string;
    country?: string;
    province?: string;
    city?: string;
    address?: string;
    zipcode?: string;
    stamp_last_login?: number;
    stamp_registration?: number;
    session_id?: string;
    meta?: _META_ARRAY;
}


export interface _USER_RESPONSE extends
    _IDX,
    _ID,
    _PRIMARY_PHOTO,
    _USER_COMMON_FIELDS {}


// to register
export interface _USER_CREATE extends
    _REQUEST_O,
    _ID, _PASSWORD, _USER_COMMON_FIELDS,
    _FILE_HOOKS {};
export interface _USER_CREATE_RESPONSE extends _USER_CRUD_RESPONSE {};

export interface _USER_EDIT extends
    _REQUEST_O,
    _IDX_O,
    _ID_O,
    _PRIMARY_PHOTO,
    _USER_COMMON_FIELDS {};
export interface _USER_EDIT_RESPONSE extends _USER_CRUD_RESPONSE {};


// user data read/load
export interface _USER_DATA_RESPONSE extends
    _RESPONSE {
        data : {
            user: _USER_RESPONSE
        }
    };
// user logout    
export interface _USER_LOGOUT extends _REQUEST_O {};            // to log out. use 'RESPONSE' for the response.
export interface _USER_LOGOUT_RESPONSE extends _REQUEST_O {};







/// post


export interface _POST_USER {
    user?: {
        idx: number;
        id: string;
        name: string;
        url_primary_photo?: string;
    }
}

export interface _CONFIG_COMMON_WRITE_FIELDS {
    name?: string;
    description?: string;
    moderators?: string;
    level_list?: number;
    level_view?: number;
    level_write?: number;
    level_comment?: number;
};

export interface _CONFIG_COMMON_READ_FIELDS {
    readonly idx: number;
    readonly updated: number;
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly moderators: string;
    readonly level_list: number;
    readonly level_view: number;
    readonly level_write: number;
    readonly level_comment: number;
    created: string;
    deleted: number;
}


export interface _CONFIG_CREATE extends _ID, _CONFIG_COMMON_WRITE_FIELDS {};
export interface _CONFIG_EDIT extends _IDX, _CONFIG_COMMON_WRITE_FIELDS {};
export interface _CONFIG_READ extends _CONFIG_COMMON_READ_FIELDS {};

export interface _CONFIG_CREATE_RESPONSE extends _RESPONSE {
    data: {
        idx: number;
    }
}
export interface _CONFIG_EDIT_RESPONSE extends _USER_CRUD_RESPONSE {};


export type _CONFIG = _CONFIG_COMMON_READ_FIELDS;
export type _CONFIGS = Array< _CONFIG >;

export interface _CONFIGS_RESPONSE extends _RESPONSE {
    data: {
        configs: _CONFIGS
    }
};                     // to receive a complete forum config fields. Use this after create/update/get/delete a forum

export interface _CONFIG_RESPONSE extends _RESPONSE {
    data: {
        config: _CONFIG
    }
};

export interface _POST_CONFIG_ID {
    post_config_id: string;
};


export interface _POST_COMMON_WRITE_FIELDS {
    title?: string;
    content?: string;
    name?: string;
    password?: string;
    address?: string;
    birthdate?: string;
    city?: string;
    contact?: string;
    country?: string;
    created?: string,
    email?: string;
    gender?: string;
    landline?: string;
    last_name?: string;
    middle_name?: string;
    mobile?: string;
    parent_idx?: string;
    province?: string;
    secret?: string;
}



export interface _POST_COMMON_READ_FIELDS {
    title: string;                  // this is changable.
    content: string;
    readonly name: string;
    readonly password: string;
    readonly first_image_idx: number;
    readonly address: string;
    readonly birthdate: string;
    readonly city: string;
    readonly contact: string;
    readonly link: string;
    readonly country: string;
    readonly created: string,
    readonly email: string;
    readonly gender: string;
    readonly landline: string;
    readonly last_name: string;
    readonly middle_name: string;
    readonly mobile: string;
    readonly province: string;
    readonly secret: string;
    deleted: number;                // can be changed

    report: number;             // editable to display
    vote_good: number;          // this can be changed upon user 'like' click
    vote_bad: number;          // this can be changed upon user 'dislike' click


}



export interface _COMMENT_COMMON_READ_FIELDS {
    content: string;
    readonly name: string;
    readonly password: string;
    readonly address: string;
    readonly city: string;
    readonly contact: string;
    readonly country: string;
    readonly created: string,
    readonly email: string;
    readonly gender: string;
    readonly landline: string;
    readonly last_name: string;
    readonly middle_name: string;
    readonly mobile: string;
    readonly province: string;
    report: number;             // editable to display
    vote_good: number;          // this can be changed upon user 'like' click
    vote_bad: number;          // this can be changed upon user 'dislike' click
    readonly depth: number;
    deleted: number;                // can be changed
}
export interface _POST extends
    _IDX,
    _POST_COMMON_READ_FIELDS,
    _POST_USER,
    _FILES,
    _COMMENTS,
    _METAS {}
export type _POSTS = Array<_POST>;


export interface _POST_CREATE extends
    _REQUEST_O,
    _POST_COMMON_WRITE_FIELDS,
    _POST_CONFIG_ID,
    _FILE_HOOKS,
    _METAS {};
    
export interface _POST_CREATE_RESPONSE extends _RESPONSE {
    data: _POST
};

export interface _POST_EDIT extends
    _REQUEST_O,
    _IDX,
    _POST_COMMON_WRITE_FIELDS,
    _FILE_HOOKS,
    _METAS {};
export interface _POST_EDIT_RESPONSE extends _RESPONSE {
    data: _POST
};



export interface _COMMENT extends 
    _IDX,
    _ROOT_IDX,
    _PARENT_IDX,
    _COMMENT_COMMON_READ_FIELDS,
    _FILES,
    _POST_USER {};
export interface _COMMENT_DATA {
    data: _COMMENT;
}
export interface _COMMENTS {
    comments?: Array<_COMMENT>;
}


export interface _POST_LIST_RESPONSE extends _RESPONSE {
    data: {
        configs: _CONFIGS;
        posts: _POSTS;
        total: number;
        page: number;
        limit: number;
        post_config_id: string;
    }
};


export interface _COMMENT_CREATE extends
    _REQUEST_O,
    _PARENT_IDX,
    _PASSWORD_O,
    _CONTENT,
    _FILE_HOOKS {};
export interface _COMMENT_CREATE_RESPONSE extends
    _RESPONSE,
    _COMMENT_DATA {};


export interface _COMMENT_EDIT extends
    _REQUEST_O,
    _IDX,
    _PASSWORD_O,
    _CONTENT_O,
    _FILE_HOOKS {};
export interface _COMMENT_EDIT_RESPONSE extends
    _RESPONSE,
    _COMMENT_DATA {};


export interface _POST_DATA_RESPONSE extends
    _RESPONSE {
        data: {
            post: _POST;
        }
    };

///
/// Meta
///

export interface _META_FIELDS {
    idx: number;
    created: number;
    updated: number;
    model: string;
    model_idx: number;
    code: string;
    data: string;
    user_idx: number;
}

export interface _META_CREATE extends _REQUEST_O {
    model: string;
    model_idx: number;
    code: any;
    data?: string;
}

export interface _META_CREATE_RESPONSE extends _RESPONSE {
    data: {
        meta: _META_FIELDS
    }
}

export interface _META_DATA_RESPONSE extends _RESPONSE {
    data: {
        meta: _META_FIELDS
    }
}

export interface _META_LIST_RESPONSE extends _RESPONSE {
    data: {
        meta: Array<_META_FIELDS>;
        total: number;
        page: number;
        limit: number;
    }
};


