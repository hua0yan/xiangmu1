<template>
  <div>
    <div class="gudingdingwei">
      <van-nav-bar left-arrow> </van-nav-bar>
      <Search />

      <div class="flie">
        <!-- 区域 -->
        <div ref="show1">
          <van-dropdown-menu active-color="#21b97a">
            <van-dropdown-item ref="item" title="区域">
              <div>
                <van-area
                  :area-list="areaList"
                  item-height="35px"
                  @confirm="gethome"
                  @cancel="qqq"
                />
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <!-- 方式 -->
        <div ref="show2">
          <van-dropdown-menu active-color="#21b97a">
            <van-dropdown-item ref="item" title="方式">
              <div>
                <van-area
                  :area-list="areaList1"
                  item-height="35px"
                  @confirm="gethome1"
                  @cancel="qqq"
                />
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <!-- 租金 -->
        <div ref="show3">
          <van-dropdown-menu active-color="#21b97a">
            <van-dropdown-item ref="item" title="租金">
              <div>
                <van-area
                  :area-list="areaList2"
                  item-height="35px"
                  @confirm="gethome2"
                  @cancel="qqq"
                />
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <!-- 筛选 -->
        <van-dropdown-menu active-color="#21b97a">
          <van-dropdown-item ref="item" title="筛选"> </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <div class="qwea">
      <van-card
        :price="item.price"
        :desc="item.desc"
        :title="item.title"
        :thumb="'http://liufusong.top:8080' + item.houseImg"
        v-for="(item, index) in list"
        :key="index"
        @click="fangzi(item)"
      >
        <template #tags>
          <van-tag plain type="danger" v-for="i in item.tags" :key="i">{{
            i
          }}</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { areainfo, housescondition, gethouses } from '@/api'
import Search from '@/components/search.vue'
export default {
  name: 'gethome',
  data () {
    return {
      list: [],
      id: '',
      value: 0,
      city_list1: 110100,
      city_list2: 120100,
      item: false,
      areaList: {
        province_list: {
          110000: '区域',
          120000: '地铁'
        },
        city_list: {},
        county_list: {}
      },
      areaList1: {
        city_list: {}
      },
      areaList2: {
        city_list: {}
      },
      area: '',
      more: '',
      price: 'null',
      rentType: 'null',
      arr1: [],
      arr2: [],
      aa: '',
      bb: '',
      cc: ''
    }
  },
  created () {
    this.areainfo()
    this.housescondition()
    this.gethouses()
  },
  methods: {
    qqq () {
      this.$refs.show1.click()
    },
    fangzi (e) {
      console.log(e)
      this.$router.push({
        name: 'HousingInformation',
        query: {
          item: e
        }
      })
    },
    gethome (e) {
      this.$refs.show1.click()
      e.forEach((item) => {
        if (item.code !== undefined) {
          this.aa = item.name
        }
      })
      console.log(this.aa)
      this.arr1.forEach((item) => {
        if (item.label === this.aa) {
          return (this.area = item.value)
        }
        if (item.children) {
          item.children.forEach((i) => {
            if (i.label === this.aa) {
              return (this.area = i.value)
            }
          })
        }
      })
      this.gethouses()
    },
    gethome1 (e) {
      this.$refs.show2.click()

      e.forEach((item) => {
        if (item !== undefined) {
          if (item.name === '整租') {
            this.rentType = 'true'
          } else if (item.name === '合租') {
            this.rentType = 'false'
          }
        }
      })
      this.gethouses()
    },
    gethome2 (e) {
      this.$refs.show3.click()
      this.arr2.forEach((item) => {
        if (item.label === e[1].name) {
          this.price = item.value
        }
      })
      this.gethouses()
    },
    async areainfo () {
      const res = await areainfo(this.$store.state.chengshi.name)
      console.log(res)
    },
    async housescondition () {
      const res = await housescondition(this.$store.state.chengshi.id)
      console.log(res)
      res.data.body.subway.children.forEach((item) => {
        this.arr1.push(item)
        this.areaList.city_list[(this.city_list2 += 100)] = item.label
        if (item.children) {
          item.children.forEach((i) => {
            this.areaList.county_list[this.city_list2++] = i.label
          })
        }
      })

      res.data.body.area.children.forEach((item) => {
        this.arr1.push(item)
        this.areaList.city_list[(this.city_list1 += 100)] = item.label
        if (item.children) {
          item.children.forEach((i) => {
            this.areaList.county_list[this.city_list1++] = i.label
          })
        }
      })
      // 不限合租整租
      res.data.body.rentType.forEach((item) => {
        this.areaList1.city_list[(this.city_list1 += 100)] = item.label
      })
      // 租金
      res.data.body.price.forEach((item) => {
        this.arr2.push(item)
        this.areaList2.city_list[(this.city_list1 += 100)] = item.label
      })
    },
    async gethouses () {
      const res = await gethouses({
        cityId: this.$store.state.chengshi.id,
        area: this.area,
        more: this.more,
        price: this.price,
        rentType: this.rentType
      })
      console.log()
      this.list = res.data.body.list
    },
    onConfirm () {
      this.$refs.item.toggle()
    }
  },
  components: { Search }
}
</script>

<style scoped lang="less">
.qwea {
  padding-top: 100px;
}
.gudingdingwei {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100000;
}
/deep/.van-card__thumb {
  width: 106px;
  height: 80px;
}
/deep/.van-tag {
  color: #39becd;
  background: #e1f5f8;
  margin-right: 5px;
}

/deep/.van-card__desc {
  padding: 5px 0px;
}
/deep/.van-picker__toolbar {
  position: absolute;
  bottom: 0;
  z-index: 100000;
  display: flex;
  width: 100%;
}
/deep/.van-picker__cancel {
  height: 100%;
  padding: 0px 0px;
  font-size: 14px;
  background-color: rgb(255 255 255 / 90%);
  border: none;
  cursor: pointer;
  flex: 1;
  color: #21b97a;
}
/deep/.van-nav-bar__content {
  background: #21b97a;
}
/deep/.van-picker__confirm {
  padding: 0px 0px;
  font-size: 14px;
  background-color: #21b97a;
  border: none;
  cursor: pointer;
  flex: 1.6;
  color: #ffffff;
}

/deep/.van-picker__columns {
  height: 280px !important;
}
.flie {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #ccc;
  margin: 0;
  padding: 0;
  background-color: #fff;
}

/deep/.van-icon {
  color: #fff;
}
/deep/.van-search {
  z-index: 10000;
  position: fixed;
  top: -3px;
  left: 70px;
  background-color: rgba(0, 0, 0, 0);
}
// /deep/.van-picker__confirm {
//   display: none;
// }
// /deep/.van-picker__cancel {
//   display: none;
// }
/deep/.van-dropdown-menu__bar {
  box-shadow: 0 0 0 #fff;
}
// /deep/ .van-picker-column {
//   transform:translate(-50%,-50%);
// }
</style>
