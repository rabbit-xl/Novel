const navHead=new Vue({
	el:'#nav',
	data:{
		navList:[
			{
				url:'#',
				content:'全部分类',
			    
			},
			{
				url:'#',
				content:'首页',
				id:'index'
			},
			{
				url:'#',
				content:'免费',
			},
			{
				url:'#',
				content:'完本',
			},
			{
				url:'#',
				content:'古言'
			},
			{
				url:'#',
				content:'现言'
			},
			{
				url:'#',
				content:'玄幻仙侠',
			},
			{
				url:'#',
				content:'悬疑科幻'
			},
			{
				url:'#',
				content:'青春游戏'
			},
			{
				url:'#',
				content:'风尚阁'
			},
			{
				url:'#',
				content:'轻小说'
			},
			
		]
		
	}
})

const wrapper=new Vue({
	el:'#adver',
	data:{
		lbt:true,
		gList:[{
			url:'#',
			content:'[活动]征文大赛'
		},
		
		{
			url:'#',
			content:'[公告]星学院作家班'
		},
		{
			url:'#',
			content:'[公告]中文网发展报告'
		},
		{
			url:'#',
			content:'[公告]2018优秀作品'
		},
		{
			url:'#',
			content:'[公告]2019网文全明星'
		},
		{
			url:'#',
			content:'[公告]红袖作家福利'
		},
		],
		wrap:[
			{
				url:'',
				content:'优秀作品联展',
				img:'//qidian.gtimg.com/hongxiu/images/index/hongxiu_rec.e8000.jpg',
			    index:0,
				current:true,
				color:'red'
			},
			{
				url:'',
				content:'这个霸总我宠了',
				img:'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8b0afcd9e2e01f98268e90fce65e812b.jpg',
			   current:false,
			   color:'',
			   index:1
			},
			{
				url:'',
				content:'清穿皇妃要娇养',
				img:'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/acffa9a3be3ccedd97d755bc01c64d00.jpg',
			  current:false,
			  color:'',
			  index:2
			},
			{
				url:'',
				content:'空间锦鲤之农门药',
				img:'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1ead2178d58b3e5cb84249cb542b5185.jpg',
			  current:false,
			  color:'',
			  index:3
			},
			{
				url:'',
				content:'我又渣了前男友',
				img:'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/5166d2fa348246c2f9370a4c00db35ed.jpg',
			    current:false,
				color:'',
				index:4
			}
		]
	}
});


// 热门书籍
const bookShow = new Vue({
		el: '#book',
		data: {
			
               hot:true,
					colo:[{color:'gold'},
						{color:'blue'},
						{color:'pink'},
						{color:'gold'}],
					tags:[],
					bookList:[]
		},
		components:{
			hotBook:{
				props:['item'],
				template:
				`
				<a :href="'https://t.shuqi.com/route.php?pagename=#!/bid/'+item.bid+'/cid/'+item.cid+'/ct/read'">
				<div class="bookitem" >
					<img v-bind:src="item.cover" class="img_book" >
				    <div class="introduce">
						<h2 class="bookname">{{ item.bookname }}</h2>
						<p class="author ">{{ item.author }}</p>
						<span class="gold bq">{{ item.sort }}</span>
						<span class="stat bq">{{ item.stat_name }}</span>
						<span class="bq blue">{{ item.size }}</span>
						<div class="desc" ><p >{{ item.desc }}</p></div>
						<span class="bq ">关键词：</span>
						<span class="bq  tag" v-for="tag in item.tags" :class="tag.color">{{tag.tag}}</span>
					</div>
				</div></a>
				`
			}
		}
		
	})

$(function(){
	 
	 
	 $.ajax({
		 type:'GET',
		 url:'https://www.apiopen.top/novelApi',
		 success:function(data){
			 
			 let hot=data.data;
			  
			  for(let j=0;j<hot.length;j++){
				   bookShow.bookList.push(
				   {
					   bookname:hot[j].bookname,
				       author:hot[j].author_name,
					   sort:hot[j].class_name,
					   desc:hot[j].introduction,
					   stat_name:hot[j].stat_name,
					   size: Math.round(hot[j].size / 10000 * 10) / 10 + '万',
					   cover:hot[j].book_cover,
					   cid:hot[j].chapterid_first,
					   bid:hot[j].bid
									   
				   },
				   );
				  
				  // console.log(hot[j].tag[0]);
			  }
                
				
			 
			   for(let i=0;i<data.data[0].tag.length;i++){
				    bookShow.tags.push({tag:data.data[0].tag[i],color:bookShow.colo[i].color});
					
			   }
			  // console.log(bookShow.tags);
			   
		 }
	 });
	 
	 
	  let timer=setInterval(picShow,1000);
	 	
	 	let index=-1;
	 	
	 	function picShow(){
	 			index++;
	 			let wrap=wrapper.wrap;
	 			for(let i=0;i<5;i++){
	 				 wrap[i].current=false;
	 				 wrap[i].color='';
	 			}
	 		
	 		if(index==5){index=0}
	 		wrap[index].current=true;
	 	    wrap[index].color='red';
	 		   	  // console.log(index);
	 			 
	 	}
	 
	 
	 $('.wrap_content').mouseleave(function(e){
	
		// clearInterval(time);
		let wrap=wrapper.wrap;
		let index=parseInt(e.target.getAttribute('data-index'))+1;
		if(index==5){ index=parseInt(e.target.getAttribute('data-index'))-4;}
		wrap[index].current=true;
		// console.log(show);
	     timer=setInterval(picShow,1000);
		
	});
	 $('.wrap_content').mouseenter(function(e)
	{
		
		let wrap=wrapper.wrap;
			let show=e.target.getAttribute('data-index');
		 for(let i=0;i<5;i++){
			 wrap[i].current=false;
			  wrap[i].color='';
			 wrap[show].current=true;
			  wrap[show].color='red';
			 	
		 }
		
		clearInterval(timer);
		
	}              
	);
	

$('#index').click(function(){
	
	window.location.href='http://127.0.0.1:8848/KIKI/index.html';
})





	
})