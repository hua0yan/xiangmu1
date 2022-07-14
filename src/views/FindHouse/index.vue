<template>
  <div class="findhouse">
    <div class="header">
      <van-icon
        name="arrow-left"
        style="line-height: 60px"
        @click="$router.push('/')"
      />
      <Search />
      <van-dropdown-menu>
        <van-dropdown-item title="区域" ref="isShow" toolbar-position="bottom">
          <van-area :area-list="areaList" @confirm="areaListvalue" />
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="isShow1">
          <van-area :area-list="areaList1" @confirm="areaListvalue1" />
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="isShow2">
          <van-area :area-list="areaList2" @confirm="areaListvalue2" />
        </van-dropdown-item>
        <van-button
          type="info"
          size="small"
          class="opacitybtn"
          @click="opacitybtn"
          >按钮</van-button
        >
        <van-popup
          v-model="show"
          position="right"
          :style="{ width: '80%', height: '100%' }"
        >
          <van-cell title="户型"></van-cell>
          <van-button
            plain
            :type="primarybtnclass"
            size="normal"
            class="btn"
            v-for="item in screen.roomType"
            :key="item.label"
            @click="primarybtn(item)"
            >{{ item.label }}</van-button
          >
          <van-cell title="朝向"></van-cell>
          <van-button
            size="normal"
            class="btn"
            v-for="item in screen.oriented"
            :key="item.label"
            >{{ item.label }}</van-button
          >
          <van-cell title="楼层"></van-cell>
          <van-button
            size="normal"
            class="btn1"
            v-for="item in screen.floor"
            :key="item.label"
            >{{ item.label }}</van-button
          >
          <van-cell title="房屋亮点"></van-cell>
          <van-button
            size="normal"
            class="btn1 pd"
            v-for="item in screen.characteristic"
            :key="item.label"
            >{{ item.label }}</van-button
          >
        </van-popup>
        <van-dropdown-item title="筛选"> </van-dropdown-item>
      </van-dropdown-menu>
      <div class="tbody" v-for="(item, index) in houseList" :key="index">
        <van-card
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="'http://liufusong.top:8080' + item.houseImg"
          @click="topage(item)"
        >
          <template #tags>
            <van-tag plain type="danger" v-for="i in item.tags" :key="i">{{
              i
            }}</van-tag>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import { AreaList, FindHouse } from "@/Api/FindList";
export default {
  name: "FindHouse",
  components: { Search },
  created() {
    this.AreaLists();
    this.findhouse();
  },
  methods: {
    /* 处理区域拿到value */
    areaListvalue(e) {
      // console.log(e);
      let len = e.length - 1;
      // console.log(len);
      if (e[len] !== undefined && e[len].name !== "不限") {
        this.isName = e[len].name;
      } else if (e[len - 1].name != "不限") {
        this.isName = e[len - 1].name;
      } else {
        this.isName = e[0].name;
      }
      console.log(this.arr);
      this.arr.forEach((item) => {
        // console.log(item.label);
        if (item.children) {
          this.isName === item.label
            ? (this.isValue = item.value)
            : this.isName;
          item.children.forEach((i) => {
            this.isName === i.label ? (this.isValue = i.value) : this.isName;
            // console.log(i);
          });
        }
      });
      // console.log(this.isValue);
      this.$refs.isShow.toggle();
      this.findhouse();
    },
    areaListvalue1(e) {
      let name = e[1].name;
      this.arr1.forEach((item) => {
        item.label === name ? (this.isValue1 = item.value) : name;
      });
      // console.log(this.isValue1);
      this.$refs.isShow1.toggle();
      this.findhouse();
    },
    areaListvalue2(e) {
      // console.log(e);
      let name = e[1].name;
      this.arr2.forEach((item) => {
        item.label === name ? (this.isValue2 = item.value) : name;
      });
      // console.log(this.isValue2);
      this.$refs.isShow2.toggle();
      this.findhouse();
    },
    /* 区域start */
    async AreaLists() {
      const res = await AreaList(this.$store.state.CityNameid);
      this.screen = res.data.body;
      // console.log(this.screen);
      /* 区域2-1 */ console.log(res);
      res.data.body.area.children.forEach((item) => {
        this.arr.push(item);
        this.areaList.city_list[(this.city_list += 100)] = item.label;
        if (item.children) {
          item.children.forEach((i) => {
            // console.log(i.label);
            this.areaList.county_list[(this.city_list += 1)] = i.label;
          });
        }
      });
      //区域2-2
      res.data.body.subway.children.forEach((item) => {
        this.arr.push(item);
        this.areaList.city_list[(this.city_list2 += 100)] = item.label;
        if (item.children) {
          item.children.forEach((i) => {
            this.areaList.county_list[(this.city_list2 += 1)] = i.label;
          });
        }
      });
      res.data.body.rentType.forEach((item) => {
        this.arr1.push(item);
        this.areaList1.city_list[(this.city_list2 += 100)] = item.label;
      });
      res.data.body.price.forEach((item) => {
        this.arr2.push(item);
        this.areaList2.city_list[(this.city_list2 += 100)] = item.label;
      });
    },
    /* 区域end */
    async findhouse() {
      const res = await FindHouse(
        this.$store.state.CityNameid,
        1,
        20,
        this.isValue,
        this.isValue1,
        this.isValue2
      );
      // console.log(res);
      this.houseList = res.data.body.list;
    },
    opacitybtn() {
      console.log(111);
      this.show = true;
    },
    // 筛选点击高亮并拿到value功能未完成
    primarybtn(item) {
      this.primarybtnclass = "primary";
      console.log(item);
      console.log(this.screen);
    },
    topage(item){
      // console.log(item);
      this.$router.push({
        path:"/ispage",
        query:{
          item
        }
      })
    }
  },
  data() {
    return {
      primarybtnclass: "default",
      show: false,
      houseList: [],
      screen: [],
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isName: "",
      isValue: "",
      isValue1: "",
      isValue2: "",
      arr: [],
      arr1: [],
      arr2: [],
      city_list: 110100,
      city_list2: 120100,
      areaList: {
        province_list: {
          110000: "区域",
          120000: "地铁",
        },
        city_list: {},
        county_list: {},
      },
      areaList1: {
        city_list: {},
      },
      areaList2: {
        city_list: {},
      },
      /* --------------------------- */
    };
  },
};
</script>

<style scoped lang="less">
.findhouse {
  .header {
    width: 100%;
    height: 60px;
    background-color: #21b97a;
  }
  /deep/.van-search {
    position: fixed;
    left: 35px;
    width: 80%;
    z-index: 0;
  }
  .van-icon {
    color: #fff;
  }
  /deep/.van-dropdown-menu__bar--opened {
    z-index: 0;
  }
  .van-card__title {
    font-size: 18px;
    font-weight: 700;
  }

  /deep/.van-picker__toolbar {
    z-index: 999;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;

    .van-picker__confirm {
      flex: 2;
      background-color: #21b97a;
      color: #fff;
    }
    .van-picker__cancel {
      flex: 1;
      color: #21b97a;
    }
  }
  .opacitybtn {
    position: fixed;
    top: 60px;
    right: 0;
    width: 88px;
    height: 40px;
    opacity: 0;
  }
  .btn {
    width: 80px;
    height: 35px;
  }
  .btn:nth-child(2n) {
    margin-right: 18px;
    margin-left: 50px;
  }
  .btn1 {
    width: 80px;
    height: 35px;
  }
  .btn1:nth-child(2n + 1) {
    margin-right: 18px;
    margin-left: 50px;
  }
  .pd {
    padding: 0;
  }
}
</style>
