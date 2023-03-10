# Pinguin

## [Live Site](https://pinguin-q9ot.onrender.com/)

### Overview

Pinguin is a [pinterest](https://www.pinterest.com/) clone that allows registered users to create pins based on uploaded images. Pins include an image and a title, along with optional components. These pins can be saved (future feature) to boards, behaving like folders that house the pins you are insired by.


### Technologies

* Ruby on Rails
* Javascript
* React
* Redux
* PostgreSQL
* Webpack
* AWS
* onRender

### Splash page
![](/Pinguin/frontend/src/assets/Pinguin-splash.png)

### Home page
![](/Pinguin/frontend/src/assets/Pinguin-preview-splash.png "Home page")

### Board view page
![](/Pinguin/frontend/src/assets/Pinguin-board.png "Board view page")

### Create pin page
![](/Pinguin/frontend/src/assets/Pinguin-create-preview.png)

## Code snippets

Modals are utilized in several parts of the project, providing a method of rendering overlapping pages without redirecting. Use of `useState` and a modal context provider allowed for this functionality.

```
function PinEditModal({pin}) {
    const [showPinEditModal, setShowPinEditModal] = useState(false)

    return (
        <>
            <button className="modal-pin-edit" onClick={() => setShowPinEditModal(true)}></button>
            {showPinEditModal && (
                <Modal onClose={() => setShowPinEditModal(false)}>
                    <PinEditForm
                        setShowPinEditModal={setShowPinEditModal}
                        pin={pin}
                    />
                </Modal>
            )}
        </>
    );
}
```

Front-end user verification was necessary as several components required a user to be logged in to access it. Crashing occurred when attempting to access the link directly when logged in, as current user was used to render user-specific features. A solution of a requireLogIn function was implemented to redirect users back to the index/logged out page when entering a direct link that required a logged in user.

```
function App() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  function requireLogIn(component){
    return !sessionUser ? history.push('/') : component
  }

  return (
    <>
    <Navigation/>
      <Switch>
        <Route path="/pin-builder/">
          {requireLogIn(<PinForm/>)}
        </Route>
         <Route path="/">
          {sessionUser ? <PinIndex/> : <LoggedOutHome/>}
        </Route>
```