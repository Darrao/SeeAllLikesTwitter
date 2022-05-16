// Script fini 
async function scriptLike() {
    var liste = []
    const limit = 2000
    const scrollTimeout = 100
    const scrollCount = 1
    var clickDelay = 100
    const maxButonToScroll = 10
    var verif = 1
    const arobase = document.getElementsByClassName('css-4rbku5 css-18t94o4 css-1dbjc4n r-1loqt21 r-1wbh5a2 r-dnmrzs r-1ny4l3l')
    const likedBy = document.getElementsByClassName('css-1dbjc4n r-1pp923h r-1moyyf3 r-16y2uox r-1wbh5a2 r-1dqxon3')[0]
    var connects = 0
    var fails = 0
    var x = 0
    var loading = 'chargement'

    function selectLikeElements() {
        return [...arobase]
    }

    async function singleScroll() {
        return new Promise(resolve => {
            setTimeout(() => {
                likedBy.scrollTo(0, likedBy.scrollHeight)
                console.log('scrolling...')
                resolve()
            }, scrollTimeout)
        })
    }

    async function singleClick(e) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, clickDelay)
        })
    }
    
    async function bulkScroll() {
        for (let i = 0; i < scrollCount; i++) {
            await singleScroll()
        }
    }

    function pushToList(e) {
        if (liste.includes(e)) {
            return;
        } else {
            liste.push(e)
        }
    }

    async function bulkClick() {
        let elements = selectLikeElements()
        console.log(elements.length + ' boutons présents')
        for (let i = 0; i < elements.length - maxButonToScroll; i++){
            try {
                await singleClick(elements[i])
                pushToList(elements[i].innerText)
                console.log(elements[i] + 'add')
                console.log(liste)
                x++
                console.log(x)
                connects++;
                isLoading()
            } catch (err) {
                fails++
            }
        }
    }
    function isLoading() {
        console.log(loading)
        loading = loading +'.'
        if (loading.length == 16) {
            loading = 'chargement'
            return;
        }
    }

    do {
        if (verif == 1) {
            console.log('Il y à assez d@ 👍')
            verif = 0
            await bulkClick()
        } else {
            console.log('il n\'y à pas assez d@ 😣')
            verif =1
            await bulkScroll()
        }
        console.log(liste)
        console.log(`New @:${connects} Failed:${fails}`)
    } while (connects < limit)
}

scriptLike()