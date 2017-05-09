# Angular Backend

Angular Backend 는 [Backend](https://github.com/thruthesky/backend) 를 사용하기 위한 Angular API 입니다.
따라서 Angular Backend 를 사용하기 위해서는 여러분들만의 Backend 가 있어야 합니다.


# TODO

* Convert old components into https://github.com/thruthesky/angular-backend-components
* Move admin page into backend itself.



# Installation

````
$ npm install angular-backend
````



# Sample Projects


* https://github.com/thruthesky/community-app
* https://github.com/thruthesky/woman - Favorite functionality.




# How To Use

## Sample app

* [Angular Backend Components](https://github.com/thruthesky/angular-backend-components)
* [Angular Backend Community App](https://github.com/thruthesky/angular-backend-community-app-basic)


## How to apply to Angular project.


먼저 angular-backend-0.2 폴더에 있는 모듈을 사용 할 수 있도록 적절하게 import 한다.

app.module.ts)

````
	import { AngularBackendModule } from 'angular-backend';

	imports: [
		AngularBackendModule
	],
````

## Tests

유닛 테스트를 하기 위해서는 아래와 같이 한다.

app.component.ts)

````

  import { TestAll } from 'angular-backend';
  constructor( ta: TestAll ) {
    ta.backend.setBackendUrl('http://backend.org/index.php');
    ta.run();
  }

````

# Sample components based on Angular Backnend

See [Angular Backend Components](https://github.com/thruthesky/angular-backend-components) for code samples of Angular Backend.



# Utilities

## getErrorString( error )

API 호출에서 에러가 발생한 경우, 그 (에러) 응답 데이터를 파라메타로 전달하면 자세한 에러 내용을 문자열로 리턴한다.



# API

## successCall()

successCall() 은 서버에서 항상 성공을 응답하는 결과를 받는다. 테스트 용도로 사용 할 수 있다.

````
this.backend.successCall().subscribe( re => {
    console.log("Success: Version: " + re['data']['version']);
}, err => console.log("Error: ", err ) );
````


## errorCall()

errorCall() 은 항상 실패의 값을 받는다. 테스트 용도로 사용할 수 있다.

````
this.backend.errorCall().subscribe( re => {
    this.error(re, 'This should be an error. But success ' + this.backend.getErrorString( re ));
}, ( error ) => {
    this.success("errorCall() : This is fake error. " + this.backend.getErrorString(error) );
    } );
````


## scriptError()

서버에서 항상 PHP 에러를 발생시켜 클라인트로 잘못된 (에러가 포험된 ) 응답 데이터 메세지를 전달하여 클라이언트에서 JSON Parsing 에서 오류를 유발한다. 테스트 용도로 사용할 수 있다.

````
this.backend.scriptError().subscribe( re => {
    console.log(re);
    this.error( re, "scriptError() - This should be script error. But success." );
}, error => {
    console.log( error );
    this.success( 'This should be script error. This is PHP script error.' );
});
````



## timeoutError()

서버의 PHP 에서 sleep(50) 를 호출하여, 긴 시간 동안 대기하여 timeout 을 유발(발생) 시킨다. 클라이언트에서 에러테스트 목적으로 사용가능하다.

````
this.backend.timeoutError().subscribe( re => {
    console.error( re, "This should be timeout error. But success." );
}, error => {
    if ( error.message == ERROR_TIMEOUT ) {
        this.success('This should be timeout error. ' + this.backend.getErrorString( error ));
    }
    else this.error( error, "This is not timeout error. But another error");
});
````
    

## internalServerError()

서버가 항상 "500 - Internal Server Error" 에러를 응답한다. 테스트 용도로 사용 할 수 있다.

````
this.backend.internalServerError().subscribe( re => {
    this.error("This must be 500 internal server error. but success");
}, error => {
    console.log(error);
    if ( this.backend.isInternalServerError( error ) ) this.success("Internal Server Error: " + this.backend.getErrorString(error) );
    else this.error(error, "This must be 500 - internal server error. but it is another error.");
});
````

# Image optimization

## on Templae
````
<img [src]=" file.url + '&type=jpg&resize=best-fit&width=100&height=100&quality=1' " style="width: 100%;">
````

## on Class

````
this.postData.list( req ).subscribe((res: _POST_LIST_RESPONSE ) => {
            console.log( res.data.posts );
            res.data.posts.map( (p: _POST) => {
                p.files.map( (f: _FILE) => {
                    f.url += "&resize=best-fit&width=100&height=100";
                });
            });
            this.share.posts = res.data.posts;
````






# Basic Components

* You can re-use basic components that are ready to be used as angular backend component.


* If you want to see the use case ( examples ) see [CommunityApp version 0.1.1](https://github.com/thruthesky/community-app/tree/0.1.1)
    * src/app/community-app/pages/login for user login.
    * src/app/community-app/pages/register2 for user registration and update
    * src/app/community-app/pages/forum2 for forum. it uses post-view-basic-component, post-form-baisc-component, comment-view-basic-component, comment-form-basic-component, pagination-component.

    * This app works with [AngularBackend version 0.1.1](https://github.com/thruthesky/angular-backend/tree/0.1.1)



# Post Form Basic Component How to Use

* Options for form input box  show/hide


````
    [option] = " {
        showForumID: false,
        showTitle: true,
        showContent: false,
        showLink: true
    } "
````


* If you want to create a post under a forum. give a forum id to [post_config_id]. This works only 'creating'

````
[post_config_id] = " 'qna' "
````

* How to edit a post. Give a full record of a post into [post] property.

````
[post]=" postToEdit "
````

* Example with a create button.

Below will show 'forum id' and 'content' input.

````
    <button *ngIf=" ! showPostForm " (click)=" showPostForm = true " class="btn btn-secondary">Create New Post</button>
    <post-form-basic-component
    *ngIf=" showPostForm "
    [post_config_id] = " post_config_id "
    [option] = " {
        showForumID: true,
        hideTitle: true
    } "
    [post] = " postPostForm "
    (create) = " list.data.posts.unshift( $event ); showPostForm = false "
    (edit) = " showPostForm = false "
    (cancel) = " showPostForm = false "
    ></post-form-basic-component>
````

* To show 'title', 'content' input box.
````
    <button *ngIf=" ! showPostForm " (click)=" showPostForm = true " class="btn btn-secondary">Create New Post</button>
    <post-form-basic-component
    *ngIf=" showPostForm "
    [post_config_id] = " post_config_id "
    [option] = " {
        showForumID: false
    } "
    [post] = " postPostForm "
    (create) = " list.data.posts.unshift( $event ); showPostForm = false "
    (edit) = " showPostForm = false "
    (cancel) = " showPostForm = false "
    ></post-form-basic-component>
````


# How to check password of post/comment

* You would need to to edit anonymous post/comment. Before showing edit form, you may first check if the password is correct.


````
    onClickEdit() {
        let password = prompt("Input Password");
        let req: _POST_EDIT = {idx: this.post.idx, password: password};
        this.postData.edit( req ).subscribe( (res: _POST_EDIT_RESPONSE ) => {
            // password match
            console.log("res: ", res);
            this.showPostEditForm = true;
        }, e => this.postData.alert( e ) );
    }
````



# How to set backend api.

You can adjust it in angular-backend/config.ts

Or you can adjust it in application code.


````
export class HomePage {
    constructor() {
        window['url_backend_api'] = "http://backend.sonub.com/index.php";
    }
}
````




# Meta - How to code with Meta

````

    onClickFavorite( post: _POST ) {
        console.log("onClickFavorite: ", post);

        if ( this.isFavorite( post ) ) { // alredy favorite. delete it.
            let f = this.findFavorite( post );
            this.meta.delete( f.idx ).subscribe( (res: _DELETE_RESPONSE) => {
                console.log('delete favorite: ', res);
                this.favorites.splice( this.favorites.findIndex(m => m.idx == res.data.idx), 1);
            }, err => {
                this.meta.alert( err );
            });
        }
        else {
            let req: _META_CREATE = {
                model: 'favorite',
                model_idx: post.idx,
                code: '' + post.idx
            };
            this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) =>{
                console.log('meta create: ', res);
                this.favorites.push( res.data.meta );
            }, err => {
                this.meta.alert( err );
            });
        }
    }

    getFavorites() {
        let req: _LIST = {
            where: 'model=?',
            bind: 'favorite',
            limit: 100
        };
        this.meta.list( req ).subscribe( (res: _META_LIST_RESPONSE) =>{
            console.log("favorites: ", res);
            if ( res.data && res.data.meta && res.data.meta.length ) {
                this.favorites = res.data.meta;
            }
            else {
                // this.favorites;
            }
        }, err => {
            this.meta.alert( err );
        })
    }
    isFavorite( post ) {
        return this.favorites.findIndex( (m: _META_FIELDS) => m.model_idx == post.idx ) != -1;
    }
    findFavorite( post ) {
        return this.favorites.find( (m: _META_FIELDS) => m.model_idx == post.idx );
    }
````
"." 