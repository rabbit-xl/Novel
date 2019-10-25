$(function() {
	$('.search_input').mouseenter(function() {
		$('.search_input').css('border', '1px solid rgba(253,250,235,1)');
	});
	$('.search_input').mouseleave(function() {
		$('.search_input').css('border', '1px solid rgba(253,250,235,0.7)');
	});
	// vue
	const search = new Vue({
		el: '#search_in',
		data: {
			message: '',

		},
		methods: {
			search_book() {
				result.searchPage=true;
				wrapper.lbt=false;
				bookShow.hot=false;
				
				$.ajax({
					type: 'GET',
					url: 'https://www.apiopen.top/novelSearchApi?name=' + this.message,
					success: function(data) {
						
					}
				});
				// 小说详情
				$.ajax({
					type: 'GET',
					url: 'https://www.apiopen.top/novelInfoApi?name=' + this.message,
					success: function(xq) {
						let search_name = $('.search_input').val();
						
						
						if (xq.data == null) {
							result.message = search_name;
							result.total = 0;
							result.find = false;
							result.not = true;
							console.log('没有找到相关书籍');
							
						} 
						else {
							let sj = xq.data.data;
							let zs = xq.data.aladdin.words;
							result.message = search_name;
							result.not = false;
							result.find = true;
							let total = xq.data.data.length + 1;
                             
							result.total = total;
							   if(xq.data.aladdin.first_chapter !=null ){
								  
								    result.information.push({
								   	bookname: search_name,
								   	cover: xq.data.aladdin.cover,
								   	author: xq.data.aladdin.author,
								   	words: Math.round(zs / 10000 * 10) / 10 + '万',
								   	category: xq.data.aladdin.category,
								   	desc: xq.data.aladdin.desc,
								   	bid:xq.data.aladdin.bid,
								   	cid:xq.data.aladdin.first_chapter.cid
								   });
							   }
							   
							    						  
							     for (let i = 0; i < sj.length; i++) {
							    
							    	result.information.push({
							    		author: sj[i].author,
							    		cover: sj[i].cover,
							    		desc: sj[i].desc,
							    		words: Math.round(sj[i].words / 10000 * 10) / 10 + '万',
							    		bookname: sj[i].title,
							    		category: sj[i].category,
							    		bid:sj[i].bid,
							    		cid:sj[i].first_cid,
							    	});
							    						
							    }
						   
						  
							
						}
					}
				});
				
				result.information=[];
			},
			
		},
	})


	// 搜索结果
	const result = new Vue({
		el: '#result_seacrh',
		data: {
			total: '',
			message: 's',
			not: false,
			find: true,
			searchPage:false,
			nav: [{
					name: '默认'
				},
				{
					name: '总字数'
				},
				{
					name: '总推荐'
				},
				{
					name: '总收藏'
				},
				{
					name: '用户点击量'
				},
				{
					name: '更新时间'
				}
			],
			information: [],
			
		},
		components:{  
			searchBook:{
				props:['item','read_book'],
				template:`
				<a :href="'https://t.shuqi.com/route.php?pagename=#!/bid/'+item.bid+'/cid/'+item.cid+'/ct/read'">
				<div class="search-item"  >
					  <img :src="item.cover" >
					  <div class="search-introudce">
						  <p class="bookname">{{ item.bookname}}</p>
						  <p>
							 <span>{{ item.author }}</span>
							 <span>{{ item.category }}</span>
							 <span>{{ item.words }}</span>
							 <span>完结</span>
						</p>
						<span class="desc">{{ item.desc }}</span>
					</div>
					<div class="btn">
					<button class="search_btn sjxq" >书籍详情</button>
					<button class="search_btn add" >加入书架</button>
					</div>
					
				  </div> </a>
				`
			}
		},
			methods:{
			read_book:function(){
				
				console.log(result.information);
				$.ajax({
					type:'GET',
					url:'http://t.shuqi.com/route.php?pagename=#!/bid/177502/ct/read'
				})
			},
			
			},
			

	})
	
	
	

})

