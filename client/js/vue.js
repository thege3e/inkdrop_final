let aside = [
	{
		bookId: 1,
		bookName: 'Notes',
		listClass: 'lists parents pcursor',
		iconClass: 'fas fa-file-alt',
		childs: [],
	},
	{
		bookId: 2,
		bookName: 'Notebooks',
		listClass: 'unclick parents',
		iconClass: 'fas fa-book',
		childs: [
			{
				bookId: 10,
				parentId: 2,
				bookName: 'First Notebook',
				listClass: 'childBook pcursor',
				isClicked: true,
				iconClass: 'fas fa-caret-down',
				childs: [],
			},
		],
	},
	{
		bookId: 3,
		bookName: 'Trash',
		listClass: 'pcursor lists parents',
		iconClass: 'fas fa-trash-alt',
	},
	{
		bookId: 4,
		bookName: 'Status',
		listClass: 'unclick parents',
		iconClass: 'fas fa-tasks',
		childs: [],
	},
	{
		bookId: 5,
		bookName: 'Active',
		listClass: 'stat lists pcursor',
		iconClass: 'far fa-circle',
		childs: [],
	},
	{
		bookId: 6,
		bookName: 'On hold',
		listClass: 'stat lists pcursor',
		iconClass: 'far fa-pause-circle',
		childs: [],
	},
	{
		bookId: 7,
		bookName: 'Completed',
		listClass: 'stat lists pcursor',
		iconClass: 'fas fa-check-circle',
		childs: [],
	},
	{
		bookId: 8,
		bookName: 'Dropped',
		listClass: 'stat lists pcursor',
		iconClass: 'fas fa-times-circle',
		childs: [],
	},
	{
		bookId: 9,
		bookName: 'Tags',
		listClass: 'unclick parents',
		iconClass: 'fas fa-tags',
		childs: [
			{
				bookId: 11,
				parentId: 9,
				bookName: 'Tutorial',
				iconClass: 'fas fa-circle tagList',
				listClass: 'pcursor lists tag',
				iconColor: 'default',
			},
		],
	},
];

// note tag aar haij ustgal bolon tag iin neriig oorchloh hailtiin function
var findNoteTag = (val) => {
	console.log('works')
	if(val==="change") {
		action = "app.notes[i].tags[j]=app.bookName"
	}else if (val==="delete") {
		action = "app.notes[i].tags.splice(j,1)"
	}
	for(i in app.notes) {
		for(j in app.notes[i].tags) {
			if(app.notes[i].tags[j]===app.lastBook[1]) {
				eval(action);
			}
		}
	}
}


// callPage iin created updated date uudiig tohiruulj uguh function
function whichDate(which) {
	month=["Jan", "Feb", "Mar", 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	date=which.getDate();
	str=date.toString().split('');
	stri=str[str.length-1];
	if(stri==='1') {
		daga='st,';
	} else if(stri==='2') {
		daga='nd,'
	} else if(stri==='3'){
		daga='rd,'
	} else {
		daga='th,'
	}
	return month[which.getMonth()]+' '+date+daga+' '+which.getFullYear();
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years';   
    }
};

function timeChange() {
	for(n in app.notes) {
		app.notes[n].beautyDate=timeDifference(new Date(), app.notes[n].modifiedDate);
	}
};


// component dotroos app instance ruu utga damjuulj bui global huvisagchid

var pushChild = '';
var extractChild = '';
var parentChild = '';
var popChildIndex = '';
var optionPos = null;
// sortBy popup iin component

Vue.component("sortby",{
	data() {
		return {

		}
	},
	props: {
		sorts: Array,
	},
	methods: {
		dropdown(sortby) {
			app.dropdown(sortby)
		},
		selectSort(sort, index, i) {
			app.selectSort(sort, index, i);
		}
	},
	template: `
		<div class="dropdown sortby">
			<div class="dropdown-trigger sortby">
				<span class="icon is-medium" @click="dropdown('sortby')">
					<i style="margin-bottom: 5px;" class="fas fa-sort-amount-down" id="blueHover" aria-hidden="true"></i>
				</span>
			</div>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content">
				<h4>SORTBY</h4>
				<a class="dropdown-item" v-for="(sort, index) in sorts[0]" :key="index" @click="selectSort(sort, index, 0)">
					<i :class="index+sort" class="" :style="{color: sort}"></i>{{sort}}
				</a>
				<hr class="dropdown-divider">
				<h4>ORDER</h4>
				<a class="dropdown-item" v-for="(sort, index) in sorts[1]" @click="selectSort(sort, index, 1)">
					<i :class="index+sort" class="" :style="{color: sort}"></i>{{sort}}
				</a>
				</div>
			</div>
		</div>
	`,
	created: function() {
		let self = this;
		window.addEventListener('click', function(e){
		  // close dropdown when clicked outside
		  if (!self.$el.contains(e.target)){
			$('.dropdown.sortby').removeClass('is-active')
		  } 
		})
	},
})


Vue.component('adds', {
	data() {
		return {
		}
	},
	methods: {
		dropdown(val) {
			callPage.dropdown(val);
		},
	},
	created: function() {
		let self = this;
		window.addEventListener('click', function(e){
		  // close dropdown when clicked outside
		  if (!self.$el.contains(e.target)){
			$('.dropdown.giveStat').removeClass('is-active')
		  } 
		})
	},
})



// Notebooks dotorh buh bookiig recursiveeer childs tuunii childs ruu handah zamaar duudaj bui heseg
var sidebarChilds = Vue.component("Sidechild", {
	data: function() {
		return {
			isActive: true,
			bookId: null,
			optionPos: null,
		}
	
	},
	props: {
		sidebar: Object,
		index: Number,
		modal: String,
		padding: Number,
		grandpa: String,
	},
	watch: {
	},
	computed: {
		pad() {
			return "padding-left:"+this.padding+"px"
		},
		recentBookId() {
			if(this.modal==='dropdown') {
				return
			} else {
				return app.bookId
			}
		},
		childs() {
			return this.sidebar.childs
		},
	},
	template: `
	<div v-if="modal===undefined">
		<div v-for="(child, index) in childs" :key="index"
			:class="{clicked: child.isClicked}" :id="child.bookId"
			@click.stop="sendBus(index, childs, grandpa, false, child.childs)">
			<div >
				<div :style="pad" class="child">
					<div class="carets" style="height:28px; width: 30px">
						<i :class="' '+child.bookName+'C'+' '+child.iconClass"
							:style="{color: iconColor(child.iconColor)}"
							v-if="(grandpa==='Notebooks' && child.childs.length!=0) || grandpa==='Tags'"
							@click="extract(child.isClicked, index, child.bookId)"></i>
					</div>
					<div class='childName'>{{child.bookName}}</div>
					<div @click="showOptions(child.childs, index, childs, $event)" class="bookPopper" data-container="body" data-toggle="popover1" data-placement="right" data-html="true">
						<i class="fas fa-ellipsis-v" ></i>
					</div>
				</div>
			</div>
			<Sidechild :grandpa="grandpa" :padding="padding+5" :sidebar="child" :index="index"></Sidechild>
                  
		</div>
	</div>

	<div v-else>
		<div v-for="child in childs" :id="child.bookId+child.bookName.split(' ')[0]" v-if="recentBookId!=child.bookId">
			<div :style="pad" class="modalBar"
				@click="second(child)">{{child.bookName}}</div>
			<Sidechild :sidebar="child" :modal="modal" :padding="padding+5"></Sidechild>
		</div>
	</div>
	`,
	methods: {
		iconColor(color) {
			console.log(color)
			if(color==='default'){
				return ''
			} else {
				return color
			}
		},
		second(child) {
			if(this.modal==='dropdown') {
				app.sortByTitle[app.last].bookId=child.bookId;
				app.sortByTitle[app.last].parentBook=child.bookName;
				app.sortByTitle[app.last].isRemoved=false;
				callPage.fatherBookName=child.bookName;
				app.dropdown('moveNote');
				app.render();
				console.log('movenote')
			} else {
				this.changeParent(child);
			}
			$('.modal.moveNote').removeClass('is-active')
		},
		// tuhain songogdson bookiig pop hiij hadgalaad modald songoson book ruu unshift hiine
		changeParent(child) {
			if(this.modal!='dropdown') {
				push = parentChild.splice(popChildIndex, 1);
				if(child.isClicked) child.iconClass='fas fa-caret-right';
				child.childs.unshift(push[0]);
				app.selectBook(0);
				app.hideModal('sidebar');
				console.log('change notbook')
			}
		},

		// songogdson bookiin icon der darahad classaar damjulan heightiig chuluulj bas utga ogno
		extract(isClicked, index, bookId) {
			console.log('extract')
			if(isClicked) {
				this.childs[index].isClicked=false;
				this.childs[index].iconClass='fas fa-caret-down';
			} else{
				this.childs[index].isClicked=true;
				this.childs[index].iconClass='fas fa-caret-right';
			}
		},
		
		// songogdson notebookiin id g selector luu ilgeene, mon options tsesni bairshlig todorhoilno
		sendBus(index, parentChilds, grandpa, pushing, childs) {
			app.lastBook[1]=parentChilds[index].bookName;
				if(childs!=undefined) pushChild=childs;
				if(app.finding && app.bookId===parentChilds[index].bookId) 
				$('.selector').show();
				app.bookId=parentChilds[index].bookId;
				if(pushing) {
					optionPos=$('#'+parentChild[popChildIndex].bookId).offset().top-85;
					$('.selector').css('top',optionPos+25+'px')
					console.log('sendbus pushing')
				} else if(pushChild===null && !pushing && grandpa==='Notebooks') {
					console.log('sendbus grandpa'+grandpa)
					$('.selector').css('top',55+'px')
				} else {
					console.log('sendbus else')
					optionPos=$('#'+app.bookId).offset().top-85;
					$('.selector').css('top',optionPos+'px')
				}
				
			// new sub nemj bui bookiin zadargaag zaana
			extractChild=this.sidebar; 
			// tuhain nested componentiin parentiig indextei globald hadgalna
			popChildIndex = index; 
			parentChild = parentChilds;	
			
			// input.search ruu bookname iig yvulna 
			// ali aside iin component bolohiig zaaj ogch bn
			if(grandpa==="Notebooks"){
				app.search='book:'+parentChilds[index].bookName;
				app.lastBook[2]='Notebooks';
			} else {
				app.search='tag:'+parentChilds[index].bookName;
				app.lastBook[2]='Tags';
				if(parentChilds[index].iconColor==='default') $('div.icon.is-small.is-left i').css('color', '');
			}
			app.finding=false;			

			// notes div iin garchigt songogdson bookname iig yvulna
			app.selectedBookName =parentChilds[index].bookName;
			timeChange();
		},
		showOptions(childs, index, sendBusChilds, e) {
			// componentiin options hesgiig solino
			$('.options').show();
			$('.options').css('top', event.clientY+'px');
			if(this.grandpa==='Tags') {
				e.stopPropagation();
				app.currentTagId=sendBusChilds[index].bookId;
			} else {
				app.bookId=sendBusChilds[index].bookId;
			}
		// new sub notebook neeh pushChild globald songogdson componentiin childs iig hadgalna
			popChildIndex = index;
			parentChild = sendBusChilds;	
			pushChild=childs;
			app.lastBook[1]=parentChild[index].bookName;
			if(callPage.topicObj.tags.includes(app.lastBook[1])) app.lastBook[2]='Tags';
			// modaliig haana

			//book options tag baihuu esvel notebook baihuu gedgiig shiidne
			if(childs!=undefined) {
				app.options = ["New Sub Notebook..", "Notebook Settings..", "Move Notebook..", "Delete Notebook.."]
			} else {
				console.log('showopt')
				app.options = ["Tag Settings..", "Delete Tag.."];
				if(sendBusChilds[index].iconColor==='default') $('div.icon.is-small.is-left i').css('color', '');
				app.selectedTagColor=sendBusChilds[index].iconColor;
			};
		}
	},
	
	
})

Vue.component('tooltip', {
	props: {
		classing: String,
		content: String,
	},
	template: `
	<div class="dropdown is-right is-hoverable">
		<div class="dropdown-trigger">
		<i @click='choose(content)' id="blueHover" :class="classing"></i>
		</div>
		<div class="dropdown-menu" id="dropdown-menu4" role="menu">
		<div class="dropdown-content">
			<div class="dropdown-item">
			<p >{{content}}</p>
			</div>
		</div>
		</div>
	</div>
	  `,
	  methods: {
		//   tooltipin ali functioniig ajilluulahiig zaaj ogno
		choose(val) {
			if(val.includes('Move')) {
				console.log('to trash note')
				this.toTrash();
			} else if (val.includes('Revision')) {
				console.log('note revision')
				this.revision();
				$('.modal.revision').addClass('is-active');
			} else {
				this.delete();
				console.log('delete note permanently')
			}
		},
		// note iig trash luu shiljulne
		toTrash() {
			callPage.topicObj.isRemoved=true;
			callPage.topicObj.bookId=3;
			app.render();
		},
		revision() {
			console.log('revision');
		},
		delete() {
			console.log('share')
			for(u=0; u<app.notes.length; u++) {
				if(app.notes[u]===callPage.topicObj) {
					app.noteToggleHistory=app.noteToggleHistory.filter(function(a) {
						if(app.notes[u].noteId===a) app.toggleIndex--;
						return app.notes[u].noteId!=a;
					})
					app.notes.splice(u, 1);
					u--;
				}
			}
			app.render();
		}
	  },
	  computed: {
		bookId() {
			return app.bookId
		},
	  },
})


// app.selectSort() functiond ashiglagdah huvisagchuud
let a=[];
let b=[];

// 
function SORT(utga) {
	o = app.notes.sort(function(a,b) {
		switch(utga) {
			case 'seconds':
				date='.getSeconds()';
				break;
				case 'minutes':
				date='.getMinutes()';
				break;
				case 'hours':
				date='.getHours()';
				break;
				case 'date':
				date='.getDate()';
				break;
				case 'month':
				date='.getMonth()';
				break;
				case 'year':
				date='.getFullYear()'
				break;
				
		}
		dateA = eval('a.createdDate'+date);
		dateB = eval('a.createdDate'+date);
		console.log(dateA, dateB)
		return (dateA<dateB) ? -1 : (dateA>dateB) ? 1 : 0;
	})
	console.log(o)
	return o;
};

Vue.component('note-options', {
	data() {
		return {
			options: ['Move to Notebook', 'Duplicate note', 'Remove note'],
		}
	},
	methods: {
		selectOption(option) {
			switch(option) {
				case 'Move to Notebook': 
					$('.modal.moveNote').addClass('is-active')
					break;
				case 'Duplicate note':
					note=app.sortByTitle[app.last];
					if(app.bookId===null) app.bookId=10;
					app.sortByTitle.unshift({
						noteId: ++app.noteId,
						bookId: app.bookId,
						titleName: note.titleName,
						createdDate: new Date(),
						modifiedDate: new Date(),
						beautyDate: '1 seconds',
						tags:note.tags,
						status: note.status,
						isRemoved: false,
						isClicked: false,
						contentHeadline: note.contentHeadline,
						content: note.content,
						revision: [{content: '', date:"First"}],
						statIcon: note.statIcon,
						parentBook: note.parentBook,
					});
					app.selectNote(0, true)
					break;
				case 'Remove note':
					if(callPage.topicObj.isRemoved===true) {
						for(u=0; u<app.notes.length; u++) {
							if(app.notes[u]===callPage.topicObj) {
								app.noteToggleHistory=app.noteToggleHistory.filter(function(a) {
									if(app.notes[u].noteId===a) app.toggleIndex--;
									return app.notes[u].noteId!=a;
								})
								app.notes.splice(u, 1);
								u--;
							}
						}
						console.log(app.noteToggleHistory)
						app.render()
					}else {
						callPage.topicObj.isRemoved=true;
						callPage.topicObj.bookId=3;
						callPage.topicObj.isClicked=false;
						app.selectNoteCtrlLast=true;
					}
					break;
			}
		},
	},
	created: function() {
		window.addEventListener('click', function(e){
			if(app.sortByTitle.length!=0) {
				id=app.sortByTitle[app.last].noteId;
			}
			$('.dropdown.callOptions').removeClass('is-active')
		  // close dropdown when clicked outside
		  if ((e.target===$('.callImg'+id)[0])){
			$('.dropdown.callOptions'+id).addClass('is-active')
			console.log('note-options')
		  }
		})
	},
})

var app = new Vue({
	el: '.all-navigators',
	data: {
		sidebars: aside, // sidebar iin heseg
		showModal: false,	// modalig haruulah eseh
		bookName: '',	// book iin neriig inputees hadgalj avna
		noteTitle: '', // note iin neriig inputes hadgalj avna
		selectedBookName: 'Notes',//notes iig haruulj bui hesgiin deed tald songogdson book iin name iig haruulna
		finding: false, // search hiij baina uu ugui yu gedgeer selectedBookName esvel note finding stats-iig haruulna
		notes: [{
			noteId: 1,
			bookId: 10,
			titleName: "Markdown example",
			createdDate: new Date(),
			modifiedDate: new Date(),
			beautyDate: '1 seconds',
			tags: ['Tutorial',],
			status: 0,
			isRemoved: false,
			isClicked: false,
			contentHeadline:'This is an example note. You can write notes in GitHub-flavor...',
			content: 'This is an example note. You can write notes in GitHub-flavored Markdown...',
			revision: [{content: '', date:"First"}],
			statIcon: 4,
			parentBook: 'First Notebook',
		}],
		last: -1, // suuld songoson note
		status: null, // sidebar status hesgiin ali ni songogdsonig zaana
		noteId: 1,	// suuld nemegdsen note iin id
		tags: aside[8].childs, // aside deerh buh taguud
		bookId: 10,	// suuld songogdson book iin id
		lastBook: [11], // suuld nemegdsen book id, suuld songogdson bookName
		options: [],  // notebook esvel tag baigaagas hamaarch option hesegt zurah array iig onoono
		modal: ["Create new notebook", null,undefined,null,"Create",true,], // ymar modal garch irehees hamaarch modaliin biyiin utgig ugnu
		tagColors: ["default", "red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink","brown", "grey", "black"],
		tagColorIndex: 0,
		selectedTagColor: 'default',
		sorts: [['Title', 'Date Created', 'Date Updated'], ['Ascending', 'Descending']], //sortby dotor zurah ner, damjulah utga
		lastSort: ["0Title", "0Ascending"],
		sortBy: 'Title', // ali utgaar ni sortolj buig harulna
		scend: 'Ascending',// ymar ordertoi sortlohiig haruulna
		search: '', // search dotorh utga
		noteToggleHistory:[1], // note soligdoh buriid note iin noteid g hadgalj avan toggle hiih bolomj olgono 
		toggleIndex: 0, // ali note iig notetogglehistory goos neehiig zaana
		count:0,
		selectNoteCtrlLast: false,
		currentTagId: 11,
	},
	computed: {
		// ymar orderoor sortolj bgagas hamaarch notes divisiond note iig zurahiig shiidej uguh heseg
		sortByTitle() {
			console.log('sortByTitle-computed')
			if(this.scend==='Descending') {
				q='.reverse()'
			} else {
				q='';
			};
			i=0;

			switch(this.sortBy) {
				case 'Title': 
					o = this.notes.sort(function(a, b) {
						var textA = a.titleName.toUpperCase();
						var textB = b.titleName.toUpperCase();
						return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
					});
					return eval('o'+q);
				case 'Date Created':
					o = this.notes.sort(function(a, b) {
						a.isClicked=false;
						dateA = a.createdDate;
						dateB = b.createdDate;
						return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
					});
					return eval('o'+q);	
				case 'Date Updated':
					o = this.notes.sort(function(a, b) {
						a.isClicked=false;
						dateA = a.modifiedDate;
						dateB = b.modifiedDate;
						return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
					});
					return eval('o'+q);	
			}
		},
	},
	components:{ 
		},
	created() {
		if(!localStorage.getItem('auth-token')) {
			window.location.replace('./')
		} else {
			$('.preloader').css('display','none')
		}
	},
	watch: {
	// search hesegt book: bookName torloor hailt hiihed tuhain bookiig select hiine
		bookId: function(val) {
			if(val<4 || val>9)  {
				this.status=null;
			}
			this.render();
		},
		//note toggle indexiig toggle history iin hoyr zahad irehed toggle hiih icon iig disabled bolgono
		toggleIndex(val) {
			console.log('toggle index value '+val)
			if(val===0) {
					$('i.fa-angle-left').css('pointer-events','none')
					.css('opacity','0.4');
					console.log('left angle disable')
				
			} else if(this.noteToggleHistory.length-1===val) {
					$('i.fa-angle-right').css('pointer-events','none')
					.css('opacity','0.4');
					console.log('right angle disable')
			} 
			if (val>0) {
				$('i.fa-angle-left').css('pointer-events','auto')
				.css('opacity','1');
				console.log('left angle enable')
			} 
			if(val<this.noteToggleHistory.length-1) {
				$('i.fa-angle-right').css('pointer-events','auto')
					.css('opacity','1');
					console.log('right angle enable')
			}
		},
	
	},
	methods: {
		noteTagColor(tag) {
			aside[8].childs.forEach(a=>{
				if(a.bookName===tag) {
					b=a.iconColor;
					return
				}
			})
				return {'background':b}
		},
		trash(e) {
			console.log('trash')
			$('.options').show();
			$('.options').css('top', e.clientY+'px');
			app.options=['Empty']; 
		},
		render(addNote) {
			console.log('app.render')
			app.selectNoteCtrlLast=false;
			app.count=0;
			if(!app.finding) {
				$('.selector').show()
			}
			if(app.scend==='Ascending' && addNote || !addNote) {
				for(p=0; p<app.sortByTitle.length; p++) {
					if((!app.sortByTitle[p].isRemoved && app.bookId!=3 && ((app.bookId===app.sortByTitle[p].bookId && app.sortByTitle[p].status<3) || app.sortByTitle[p].titleName.toUpperCase().includes(app.search.toUpperCase()) ||(app.bookId===null && app.sortByTitle[p].status<3) || app.sortByTitle[p].status===app.status || (app.sortByTitle[p].tags.includes(app.lastBook[1]) && app.lastBook[2]==='Tags'))) || (app.bookId===3 && app.sortByTitle[p].isRemoved)) {
						if(app.count===0) {
							app.selectNote(p, false); 
						}
						app.count++;
					}
				}
			} else if(addNote && app.scend === 'Descending') {
				for(p=app.sortByTitle.length-1; p>=0; p--) {
					if((!app.sortByTitle[p].isRemoved && ((app.bookId===app.sortByTitle[p].bookId && app.sortByTitle[p].status<3) || app.sortByTitle[p].titleName.toUpperCase().includes(app.search.toUpperCase()) ||(app.bookId===null && app.sortByTitle[p].status<3) || app.sortByTitle[p].status===app.status || (app.sortByTitle[p].tags.includes(app.lastBook[1]) && app.lastBook[2]==='Tags'))) || (app.bookId===3 && app.sortByTitle[p].isRemoved)) {
						if(app.count===0) {
							app.selectNote(p, false); 
						}
						app.count++;
					}
				}
			}
			
			if(app.count>0) {
				$('#cke_textarea').show();
				$('div.board').css('flex-grow', '1');
				callPage.noteBoard=true;
			} else {
				callPage.noteBoard=false;
				$('#cke_textarea').hide();
				$('div.board').css('flex-grow', '0');

			}
		},
		find(val) {
			if(val!==''){
				app.bookId=NaN;
				app.lastBook[1]=undefined;
				app.status=NaN;
				val=val.toUpperCase();
				console.log(val)
				$('.selector').hide()
				if(val.includes('BOOK:')) {
					childs = aside[1].childs;
					this.nameBook(val, childs, undefined, true)
				} else if(val.includes('STATUS:')) {
					if(val.includes('ACTIVE')) {
						this.selectBook(4);
					} else if(val.includes('ON HOLD')) {
						this.selectBook(5);
					} else if(val.includes('COMPLETED')) {
						this.selectBook(6);
					} else if(val.includes('DROPPED')) {
						this.selectBook(7);
					}
				} else if(val.includes('TAG:')) {
						childs = aside[8].childs;
						this.nameBook(val, childs, true)
				} else {
					app.render()
				}
				app.finding=true;
			}else {
				if(app.finding) this.selectBook(0, 1);
				app.finding=false;
			}
		},
		// notebook iin options ali functioniig zaahiig todruulj ogno
		choose(val) {
			if(app.bookName!='') {
				if(val.includes("new")) this.addNotebook();
				if(val.includes("Tag Settings")) {
					color=this.selectedTagColor;
					parentChild[popChildIndex].iconColor=color;
					this.nameBook(this.currentTagId, aside[8].childs, true);
				}
				if(val.includes("Notebook Settings")) this.nameBook(this.bookId, aside[1].childs);
			}
			if(val.includes("Delete Notebook")) this.deleteBook("book");
			if(val.includes("Delete Tag")) this.deleteBook("tag");
		},
		showOptions(val) {
			if(val==='empty') {this.options=["Empty"]; this.selectBook(2)}
			if($(".options").attr('class').includes('is-active')) {
				$(".options").hide();
				$(".options").removeClass('is-active')
			} else {
				$(".options").show();
				$(".options").addClass('is-active')
			}

		},
		// notebookiig nogoo notebookd shiljulne
		noParentBook() {
			Book = parentChild.splice(popChildIndex, popChildIndex+1);
			aside[1].childs.unshift(Book[0]);
			// $('#exampleModal').modal('hide');
			this.hideModal('sidebar');
		},
		// notebookiin neriig ahin shinechilne
		nameBook(id, childs, tag, search) {
			if(childs.length===0) {
				return
			} else {
				if(tag) {
					// this.nameBook(this.bookId, aside[8].childs, true);
					findNoteTag("change")
					this.lastBook[1]=this.bookName;
				}
				console.log(id)
				if(isNaN(id)===false){
					console.log('namebook notebook set')
					condition='childs[m].bookId===id';
					evalcode=`
					console.log(childs[m].childs)
					childs[m].bookName=this.bookName; this.bookName=""`
				} else {
					condition='id.includes(childs[m].bookName.toUpperCase())';
					evalcode=`
					if(childs!=aside[8].childs) {grandpa='Notebooks';} else {grandpa=undefined}
					sidebarChilds.options.methods.sendBus(m, childs, grandpa, false)
					if(search) {
						app.finding=true;
					} else {
						app.finding=false;
					}
					app.searched=true;
					`
				}//must "Notebooks"
				for(m in childs) {
					if(eval(condition)) {
						eval(evalcode)
					}
					if(!tag) this.nameBook(id, childs[m].childs, undefined);
				}
			}
			// $('#exampleModal').modal('hide');
			this.hideModal('sidebar');
		},
		searchNote(utga, toggleIndex) {
			if(utga==='empty') { //bur moson ustgana
				for(i=0; i<this.sortByTitle.length; i++) {
					if(this.sortByTitle[i].bookId===3) {
						this.sortByTitle.splice(i, 1); i--;
					}
				}
				app.render();
				condition='';
				expression='';
			} else if(utga==='delete'){ //trash luu shiljuulne
				condition='this.notes[i].bookId===this.bookId';
				expression=`
					this.notes[i].bookId=3;
					this.notes[i].isRemoved=true;
					app.render();
					`
			} else if (utga==='toggle') {// note iig toggle history daguu selectlene
				condition='this.notes[i].noteId===this.noteToggleHistory[toggleIndex]';
				expression='this.selectNote(i, true)'
				console.log(toggleIndex)
			}
		
			for( i in this.notes) {
				if(eval(condition)) {
					eval(expression)
				}
			}
		},
		dropdown(val) {
			console.log('dropdown')
			if($('.dropdown'+'.'+val)[0].className.includes('is-active')){
				$('.dropdown'+'.'+val).removeClass('is-active')
			} else {
				$('.dropdown'+'.'+val).addClass('is-active')
			}
		},
		selectSort(sort, index, i) {
			this.selectNote(0, true);
			$('i.'+index+sort.split(' ')[0]).addClass('fas fa-circle');
			if(index+sort.split(' ')[0]!=this.lastSort[i]) {
				if(i===0) {
					$('i.'+this.lastSort[i]).removeClass('fas fa-circle');
				} else {
					$('i.'+this.lastSort[i]).removeClass('fas fa-circle');
				}
			}
			this.lastSort[i] =''+index+sort.split(' ')[0];

			switch(sort) {
				case 'Title':
					this.sortBy='Title';
					break;
				case 'Date Created': 
					this.sortBy='Date Created';
					break;
				case 'Date Updated':
					this.sortBy='Date Updated';	
					break;
				case 'Ascending': 
					this.scend='Ascending';	
					break;
				case 'Descending': 
					this.scend='Descending';	
					app.last=app.sortByTitle.length-app.last-1;
					break;
			}
			
			app.render();
		},
		deleteBook(val) {
			// sidebar aas tag iig ustgana
			if(app.bookId===10 && app.lastBook[2]!='Tags') {
				alert("You can not delete this notebook because it is default notebook")
			} else {
				parentChild.splice(popChildIndex,1);
				console.log(parentChild.length+' childs remaining')
				//notes noteboardaas tag iig ustgana
				if(val==="tag") findNoteTag("delete");
		
				//notes dotroos booktei hamaarah note uudiig trash luu shiljuulne
				this.searchNote('delete');
				this.selectBook(0)
				// $('#exampleModal').modal('hide');
			}
			this.hideModal('sidebar');
		},
		// shineer notebookiig uusgene
		addNotebook() {
			bookId=app.bookId
			$('#'+app.bookId).parent().removeClass('clicked')
			if(pushChild===null) {
				aside[1].childs.unshift({
					bookId: ++this.lastBook[0],
					parentId: bookId,
					bookName: this.bookName,
					iconClass: 'fas fa-caret-down',
					isClicked: true,
					listClass: 'childBook pcursor',
					childs: [],
				});
				console.log('addnotebook noparent')
				sidebarChilds.options.methods.sendBus(0, aside[1].childs, 'Notebooks', false)
			}else {
				parentChild[popChildIndex].isClicked = false;
				pushChild.unshift({
					bookId: ++this.lastBook[0],
					parentId: this.bookId,
					bookName: this.bookName,
					iconClass: 'fas fa-caret-down',
					isClicked: true,
					listClass: 'childBook pcursor',
					childs: [],
				});
				console.log('addnotebook pushchild')
				sidebarChilds.options.methods.sendBus(0, pushChild, 'Notebooks', true)
			}
			this.bookName = null;
			// $('#exampleModal').modal('hide');
			this.hideModal('sidebar');
			// new sub nemmegts tuhain book iig zadlana
		},
		hideModal(className) {
			if(className==='sidebar') this.bookName='';
			$(".modal"+'.'+className).removeClass("is-active");
		},
		bookTypes(option) {
			if(option.includes("New")){
				this.modal = ["Create new notebook in"+" '"+this.lastBook[1]+"'",null,null,null,"Create", true];
				this.bookSettings = this.addNotebook;
			$(".modal.sidebar").addClass("is-active");
			} else if(option.includes("Notebook Set")) {
				$(".modal.sidebar").addClass("is-active");
				this.modal = ["Notebook Settings", null, null, null, "Save", true] ;
				this.bookName=this.lastBook[1];
			} else if(option.includes("Move")) {
				$(".modal.sidebar").addClass("is-active");
				this.modal = ["Move Notebook"+" '"+this.lastBook[1]+"'", "Select new parent book", aside[1], null, null, false]
			} else if(option.includes("Delete Notebook")) {
				$(".modal.sidebar").addClass("is-active");
				this.modal = ["Delete Notebook" + " '"+this.lastBook[1]+"'", "You cannot undo this action.", null, null, "Delete", false]
			} else if (option.includes("Tag Settings")) {
				$(".modal.sidebar").addClass("is-active");
				this.modal = ["Tag Settings", null, null, null, "Save", true, true];
				this.bookName=this.lastBook[1];
			} else if (option.includes("Delete Tag")){
				$(".modal.sidebar").addClass("is-active");
				this.modal=["Delete Tag" + " '"+this.lastBook[1]+"'", "You cannot undo this action.", null, null, "Delete", false]
			}
			if(option.includes("Empty")) {
				this.searchNote('empty');
			}
			$(".options").hide();
		},
		selectNote(index, pushing) {
			console.log('selectNote app')
			if(app.selectNoteCtrlLast) {
				app.render()
			} else {
				if(index!=undefined) {
					// for(i in this.notes) {
					// 		this.notes[i].isClicked=false;
					// }
					this.notes.map(function(a) {a.isClicked=false})
					this.sortByTitle[index].isClicked = true;
					if (this.last > -1 && this.last != index) {
						if(!pushing) {
							if(app.noteToggleHistory.length>30) {
								app.noteToggleHistory.shift();
							} else {
								this.toggleIndex++;
							}
							this.noteToggleHistory.push(this.notes[index].noteId);
							console.log('notetogglehistory'+this.noteToggleHistory)
						}
					}
					this.last = index;
					callPage.topicObj=this.sortByTitle[this.last];
					callPage.noteTitle=this.sortByTitle[index].titleName;
					callPage.numbs=this.sortByTitle[index].tags;
					CKEDITOR.instances['textarea'].setData(this.sortByTitle[index].content);
					switch(this.sortByTitle[this.last].status) {
						case 0:
							callPage.status=['','Status','status'];
							break;
						case 1:
							callPage.status=['far fa-circle','Active','popStat'];
							break;
						case 2:
							callPage.status=['far fa-pause-circle','On hold','popStat'];
							break;
						case 3:
							callPage.status=['fas fa-check-circle','Completed','popStat'];
							break;
						case 4:
							callPage.status=['fas fa-times-circle','Dropped','popStat'];
							break;
					}
				}
			}
				
		// this.notes[index].beautyDate=(Date.now()-this.notes[index].modifiedDate)/1000
			// for(i=0; i<this.notes.length; i++) {
			// 	if(this.notes[i].bookId===bookId) {
			// 		this.notes[i].isClicked = true;
			// 	}
			// }

		},
		addNote() {
			id=++this.noteId;
			if(app.finding) app.selectBook(0,1);
			if(this.bookId===null || (this.bookId>9 && app.lastBook[2]!='Tags')){
				if(this.bookId===null) this.bookId=10;
				if(app.sortByTitle.length!=0) {
					this.sortByTitle[this.last].isClicked=false;
				}
				this.noteToggleHistory.push(id);
				if(this.noteToggleHistory.length<30) this.toggleIndex++;
				this.sortByTitle.unshift({
					noteId: id,
					bookId: this.bookId,
					titleName: '',
					createdDate: new Date(),
					modifiedDate: new Date(),
					beautyDate: '1 seconds',
					tags:[],
					status: 0,
					isRemoved: false,
					isClicked: false,
					contentHeadline: '',
					content: '',
					revision: [{content: '', date:"First"}],
					statIcon: 0,
					parentBook: app.lastBook[1],
				});
			}
			app.render(true)
		},

		selectBook(index, find) {
			if(find) app.finding=false;
			if(index!=undefined) {
				if(index===0) {
					var top = $("#"+aside[index].bookId).offset().top-83;
					$(".selector").css("top", top+"px");
					this.bookId=null;
					if(!find)
					this.search='book:bookname status:statusname tag:tagname';
					// notes div iin garchigt songogdson bookname iig yvulna
					this.selectedBookName=aside[index].bookName
				} else if(!aside[index].listClass.includes("unclick")){
					var top = $("#"+aside[index].bookId).offset().top-83;
					$(".selector").css("top", top+"px");
					this.bookId=this.sidebars[index].bookId;
				// notes div iin garchigt songogdson bookname iig yvulna
					this.selectedBookName=aside[index].bookName
					if(index>3 && index<8) {
						this.search='status:'+aside[index].bookName;
					}
					app.lastBook[2]=aside[index].bookName;
					timeChange();
					if(index>3 && index<9) {
						this.status=index-3;
					}
					if(index===2) {
						app.search=''
						optionPos = $("#"+app.bookId).offset().top+20+83;
						$(".options").css("top", optionPos+"px");
					}
					app.finding=false;	
				}
			} 
			console.log('selectbook')
		},

	},
});

// ckeditord ym bichih burt note iin content hesgiin utgiig shinechilne
var ck=CKEDITOR.instances['textarea'];
ck.on('key', function(event){
	callPage.editContent();
});

var callPage = new Vue({
	el: '.navigate',
	data: {
		numbs: app.notes[0].tags,
		noteTag: '',
		noteTitle: '',
		topicObj: '',
		createdDate: '',
		fatherBookName: 'First Notebook',
		updatedDate: '',
		noteContent: '',
		status: ['','Status', 'status'],
		tags: aside[8].childs,
		searching: '',
		noteBoard: false,
		targeted: false,
		deleteWork: false,
		lastContentTime: 0,
		selectedHistory: null,
		counter: -1,
		interval: null,
	},
	computed: {
		bookId() {
			return app.bookId
		},
		childs() {
			return aside[1]
		},
		noTag() {
				for(a in aside[8].childs) {
					if(this.searching==='') return false;
					if(aside[8].childs[a].bookName.toUpperCase().includes(this.searching.toUpperCase())) {
						return false;
					}
				}
			return true;
		},
	},
	watch: {
		counter(val) {
			if(val===4) {
				this.pushHistory();
				clearInterval(this.interval);
				this.counter=-1;
			}
		},
		topicObj() {
			this.lastContentTime=this.topicObj.modifiedDate;
			this.topicObj.isRemoved? this.fatherBookName='Trash' : this.fatherBookName=this.topicObj.parentBook;
			$('.revisionContent').html(this.topicObj.revision[this.topicObj.revision.length-1].content);
			console.log('changed note')
			return this.findBook(aside[1].childs), this.date()
		},
		selectedHistory(val) {
			console.log('selHistCHange '+val)
			if(val===null) {
				$('.revisionContent').html(this.noteContent);
			} else {
				$('.revisionContent').html(val);
			}
		},
		
	},
	methods: {
		noteTagColor(tag, index) {
			aside[8].childs.forEach(a=>{
				if(a.bookName===tag) {
					b=a.iconColor;
					return
				}
			})
			return {
				"background": b,
				'border': callPage.istarget(index)
			}
		},
		istarget(index) {
			if(this.targeted===true && index===this.numbs.length-1) {
				return '1px solid rgba(73, 197, 255, 0.8)';
			}
		},
		backup(content,index) {
			if(index===0) {
				return null
			} else {
				return content
			}
		},
		editTopic() {
			this.topicObj.titleName=this.noteTitle;
		},
		takeStatus(stat, selected) {
			console.log('callPage')
			this.topicObj.status=stat;
			switch(stat) {
				case 0:
					callPage.status=['','Status','status'];
					break;
				case 1:
					callPage.status=['far fa-circle','Active','popStat'];
					break;
				case 2:
					callPage.status=['far fa-pause-circle','On hold','popStat'];
					break;
				case 3:
					callPage.status=['fas fa-check-circle','Completed','popStat'];
					break;
				case 4:
					callPage.status=['fas fa-times-circle','Dropped','popStat'];
					break;
			}
			if(!selected) callPage.dropdown('giveStat');
			if(stat>2) app.render();
		},
		tagDrop(tagName) {
			$('.dropdown.input-tags').addClass('is-active');
			if(tagName===null) {
				this.searching='';
			} else {
				this.searching=tagName;
			}
			if(!this.deleteWork && this.targeted) {
				this.targeted=2;
			}
			this.deleteWork=false;
		},
		deleteTag(noteTag){
			this.deleteWork=true;
			if(noteTag==='' || noteTag===null) {
				if(!this.targeted) {
					this.targeted=2;
				} else if(this.targeted===2) {
					this.targeted=true;
				} else{
					callPage.numbs.pop();
				}
			}
			if(callPage.topicObj.tags.length===0) {
				app.render();
			}
		},
		findBook(childs) {
			if(childs===undefined) {
				return
			} else {
				for(i in childs) {
					if(childs[i].bookId===this.topicObj.bookId) {
						this.fatherBookName = childs[i].bookName
					} 
					this.findBook(childs.childs);
				}

			}
		},
		restore() {
			this.topicObj.content=this.selectedHistory;
			CKEDITOR.instances['textarea'].setData(this.topicObj.content);
			app.hideModal('revision')
		},
		date(){created=this.topicObj.createdDate;
			this.createdDate=whichDate(created);
			updated=this.topicObj.createdDate;
			this.updatedDate=whichDate(updated);},
		dropdown(val) {
			console.log('app.dropdown'+val)
			app.dropdown(val)
		},
		toggleNote(dir) {
			if(dir==='left') {
				if(app.toggleIndex>0) app.toggleIndex--;
				app.searchNote('toggle',app.toggleIndex)
			} else {
				if(app.toggleIndex<app.noteToggleHistory.length-1) app.toggleIndex++;
				app.searchNote('toggle',app.toggleIndex)
			}
		},

		// dropdown deerees tag songohod tag nemne
		dropToTag(tagName, button) {
			if(tagName!=null) {
				tagName.split('').forEach(a=>{
					if(a.charCodeAt()===32) {
						b=1
					} else {
						b=0
					}
				})
				if(b===0) {
					this.noteTag=tagName;
					this.addTag(button);
				}
			}
		},

		// note d tag nemeh uyd zurah uildluud
		addTag(button) {
			if(app.bookId===null) {
				id=10;
			}else {
				id=app.bookId
			}
			app.selectedTagColor='default';
			// sidebard zurah heseg
			f=true;
			for(i in this.topicObj.tags) {
				if(this.topicObj.tags[i]===callPage.noteTag) {
					f=false
				}
			}
			if(f) {
				if(!button)
				aside[8].childs.unshift({
					bookId: ++app.lastBook[0],
					parentId: 9,
					bookName: this.noteTag,
					iconClass: 'fas fa-circle tagList',
					listClass: 'pcursor lists tag',
					iconColor: 'default',
				});
				// note iin tag hesegt zurah 
				this.topicObj.tags.push(this.noteTag,);

			}
			this.noteTag = null;
			this.dropdown('input-tags')
		},

		pushHistory() {
			push=false;
			if(callPage.topicObj.revision.length===0){
				callPage.topicObj.revision.unshift({
					content:callPage.noteContent,
					date: callPage.updatedDate
				});
				console.log('pushed history cuz there is no history')
			} else {
				last=$(callPage.topicObj.revision[0].content).text();
				pres=$(callPage.noteContent).text();
				if(pres===undefined) {
					alert('there is no text in editor')
				} else {
					if(pres.includes(last)){
						callPage.topicObj.revision[0].content=callPage.noteContent
						console.log('switched last history')
					} else {
						callPage.topicObj.revision.unshift({
							content:callPage.noteContent,
							date: callPage.updatedDate
						});
						console.log('pushed history');
					}
				}
			}
				$('.revisionContent').html(this.noteContent);
		},

		// note iig solih uyd contentin utgiig dagaj solino
		editContent() {
			this.topicObj.modifiedDate = new Date();
			console.log("editContent")
				// if(callPage.noteContent!=this.topicObj.revision[this.topicObj.revision.length-1].content) {
					if(this.counter===-1) {
						this.counter=0;
						this.interval = setInterval(function(){callPage.counter++; console.log('Save after'+' '+(7-callPage.counter)+'sec')}, 1000)
					} else {
						this.counter=0
					}
				// } else {
					// console.log('no changes found')
				// }
		},
	},
});

var textEditorSetData='';

CKEDITOR.instances.textarea.on('change', function() { 
    content=CKEDITOR.instances.textarea.getData();
    callPage.noteContent=content;
	callPage.topicObj.content=content;
	(content.length>69)? dot='...' : dot='';
	callPage.topicObj.contentHeadline=$(content).text().slice(0,70)+dot;
});

$(document).ready(function() {
	$('i.'+app.lastSort[0]).addClass('fas fa-circle');
	$('i.'+app.lastSort[1]).addClass('fas fa-circle');
	$( "html[dir='ltr'] body" ).css('flex','1 1 auto')
})

function haa(a) {
	if(a==true) $(".navigate").hide();
	if(a==false) $('.navigate').show();
};
function bookOption(val) {
	if(val===1){
		app.addNotebook(pushChild);
	}
	console.log(pushChild)
}

app.selectBook(0);
app.selectNote(0, true);
// $('body').on('click', function (e) {
//     $('[data-toggle=popover]').each(function () {
//         // hide any open popovers when the anywhere else in the body is clicked
//         if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
//             $(this).popover('hide');
//         }
// 	});
// 	console.log($(this).has(e.target))
// 	// console.log(e.target.attr('class'))
// });
$(document).click(function(e){
	console.log('document click listener')
	moveNote = $('.dropdown.moveNote');
	if(app.count>0 && !moveNote[0].contains(e.target)) {
		moveNote.removeClass('is-active')
	}
	if(e.target.className.includes('bookPopper') || e.target.className.includes('fa-ellipsis-v')) {
		$('#options').css('top', e.clientY+'px')
	} else {
		$("#options").hide();
	}
	if(!e.target.className.includes('giveTrig')){
		$('.giveStat').removeClass('is-active');
	}
	$('.input-tags').removeClass('is-active');
	callPage.topicObj.titleName=callPage.noteTitle;
});

$(document).keyup(function(e){
	console.log('document keyup listener')
	if(e.which===187) {
		app.addNote();
	}
})

$('input.Tags').click(function(e){
	console.log('input.tags click listener')
	callPage.targeted=false;
	e.stopPropagation();
});

// ckeditor ready bolmogts click event nemj bga
var refreshEditor = CKEDITOR.on("instanceReady", function(event){
	 //put your code here
	ck.document.$.firstElementChild.addEventListener('click', function(e) {
		moveNote = $('.dropdown.moveNote');
		moveNote.removeClass('is-active')
		$("#options").hide();
		console.log('editor click event')
		$('.giveStat').removeClass('is-active');
		$('.input-tags').removeClass('is-active');
		$('.dropdown.sortby').removeClass('is-active')
	})
});